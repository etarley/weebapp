import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { connectDb, insertUserSchema, selectUserSchema, sessions, users } from '@weebapp/db';

import { eq } from 'drizzle-orm';
import { sha256 } from 'hash.js';
import { Hono } from 'hono';
import { Lucia, TimeSpan, generateId } from 'lucia';
import * as z from 'zod';
const authHeaderSchema = z.object({
  authorization: z.string().startsWith('Bearer '),
});


const app = new Hono();

app.get('/', (ctx) => {
  return ctx.text('Hello, World!');
});

// Register a new user
app.post('/register', async (ctx) => {
  const databaseUrl = ctx.env?.DATABASE_URL as string;
  const authToken = ctx.env?.DATABASE_AUTH_TOKEN as string | undefined;
  const db = connectDb({
    url: databaseUrl,
    authToken: authToken,
  });

 
  

  const { email, password, name, avatarUrl } = await ctx.req.json();

  //generate user id
  const id = generateId(15);

    // Validate the user input using insertUserSchema
  const validatedData = insertUserSchema.parse({ email, password, name, avatarUrl, id });

  // Hash the password
  const hashedPassword = sha256().update(validatedData.password).digest('hex');

  try {
    // Validate and create the user using Lucia Auth
    const user = await db.insert(users).values({ id, email: validatedData.email, password: hashedPassword, name, avatarUrl }).execute().then(
      selectUserSchema.parse
    );
    return ctx.json({ message: 'User registered successfully', user });
  } catch (error) {
    if (error instanceof Error && error.message === 'AUTH_DUPLICATE_KEY_ERROR') {
      return ctx.json({ error: 'Email already exists' }, 409);
    } else if (error instanceof Error && error.message === "SQLITE_CONSTRAINT: SQLite error: UNIQUE constraint failed: users.email") {
      return ctx.json({ error: 'Email already exists' }, 409);
    } {
      console.error(error);
      return ctx.json({ error: 'Failed to register user' }, 500);
    }
  }
});


// Login and generate JWT
app.post('/login', async (ctx) => {
  const databaseUrl = ctx.env?.DATABASE_URL as string;
  const authToken = ctx.env?.DATABASE_AUTH_TOKEN as string | undefined;
  const secretKey = ctx.env?.JWT_SECRET as string;

  const db = connectDb({
    url: databaseUrl,
    authToken: authToken,
  });
  const adapter = new DrizzleSQLiteAdapter(db, sessions, users);
  const lucia = new Lucia(adapter,
);

  const { email, password } = await ctx.req.json();
   

  try {
    // Find the user by email
    const userResults = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .execute();
    

    const user = selectUserSchema.array().parse(userResults)[0];

    if (!user) {
      return ctx.json({ error: 'Invalid email or password' }, 401);
    }

    // Compare the provided password with the hashed password
    const hashedPassword = sha256().update(password).digest('hex');
    if (user.password !== hashedPassword) {
      return ctx.json({ error: 'Invalid email or password' }, 401);
    }
  const session = await lucia.createSession(user.id, {
      expiresAt: Date.now() + new TimeSpan(30,'d').milliseconds(),
    });

    return ctx.json({ token: session.id, user: { id: user.id, email: user.email, name: user.name, avatarUrl: user.avatarUrl } });
  } catch (error) {
    console.error(error);
    return ctx.json({ error: 'Failed to login' }, 500);
  }
});

// Protected route that requires authentication
app.get('/protected', async (ctx) => {
  const databaseUrl = ctx.env?.DATABASE_URL as string;
  const authToken = ctx.env?.DATABASE_AUTH_TOKEN as string | undefined;

  const db = connectDb({
    url: databaseUrl,
    authToken: authToken,
  });

  const adapter = new DrizzleSQLiteAdapter(db, sessions, users);
  const lucia = new Lucia(adapter);

  try {
    // Validate the Authorization header using Zod
    const { authorization } = authHeaderSchema.parse({
      authorization: ctx.req.header('Authorization'),
    });

    const token = lucia.readBearerToken(authorization);
    if (!token) {
      return ctx.json({ error: 'Missing or invalid bearer token' }, 401);
    }

    try {
      const session = await lucia.validateSession(token);
      if (!session.user) {
        return ctx.json({ error: 'Unauthorized: User session not found' }, 401);
      }

      const userId = session.user.id;

      // Fetch the user data based on the userId from the session
      const userResults = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .execute();
      
      const user = selectUserSchema.array().parse(userResults)[0];

      return ctx.json({ message: 'Access granted', user: { id: user.id, email: user.email, name: user.name, avatarUrl: user.avatarUrl, emailVerified: user.emailVerified } });
    } catch (error) {
      console.error(error);

      if (error instanceof z.ZodError) {
        return ctx.json({ error: 'Unauthorized: Invalid user data' }, 401);
      } else if (error instanceof Error && error.message.startsWith('SQLITE')) {
        return ctx.json({ error: 'Database error: Failed to fetch user data' }, 500);
      } else {
        return ctx.json({ error: 'Unauthorized: Failed to validate user session' }, 401);
      }
    }
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return ctx.json({ error: 'Invalid Authorization header format' }, 400);
    } else {
      return ctx.json({ error: 'Unauthorized: Failed to authenticate' }, 401);
    }
  }
});

export default app;