import { connectDb, insertUserSchema, selectUserSchema, users } from '@weebapp/db';
import { eq } from 'drizzle-orm';
import { sha256 } from 'hash.js';
import { Hono } from 'hono';
import { SignJWT, jwtVerify } from 'jose';

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

  const { email, password } = await ctx.req.json();

  // Validate the user input using insertUserSchema
  const validatedData = insertUserSchema.parse({ email, password });

  // Hash the password
  const hashedPassword = sha256().update(validatedData.password).digest('hex');

  try {
    // Insert the user into the database
    await db.insert(users).values({ email: validatedData.email, password: hashedPassword });
    return ctx.json({ message: 'User registered successfully' });
  } catch (error) {

    
    // Handle email already exists error or other errors based on the unique constraint violation error
    if (error instanceof Error && error.message === "SQLITE_CONSTRAINT: SQLite error: UNIQUE constraint failed: users.email") {
      return ctx.json({ error: 'Email already exists' }, 409);
    }
    else if (error instanceof Error) {
      
      
      // Handle other errors
      return ctx.json({ error: error.message }, 500);
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

    // Generate JWT
    const jwt = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(secretKey));

    return ctx.json({ token: jwt });
  } catch (error) {
    console.error(error);
    return ctx.json({ error: 'Failed to login' }, 500);
  }
});

// Protected route that requires authentication
app.get('/protected', async (ctx) => {
  const databaseUrl = ctx.env?.DATABASE_URL as string;
  const authToken = ctx.env?.DATABASE_AUTH_TOKEN as string | undefined;
  const secretKey = ctx.env?.JWT_SECRET as string;

  const db = connectDb({
    url: databaseUrl,
    authToken: authToken,
  });

  const authHeader = ctx.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return ctx.json({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the JWT
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secretKey));
    const userId = payload.userId as number;

    // Fetch the user data based on the userId from the JWT
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .execute()
      .then(selectUserSchema.parse);

    return ctx.json({ message: 'Access granted', user });
  } catch (error) {
    console.error(error);
    return ctx.json({ error: 'Unauthorized' }, 401);
  }
});

export default app;