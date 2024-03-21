import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { auth_keys, insertAuthKeySchema } from './schemas/auth_keys';
import { insertSessionSchema, sessions } from './schemas/sessions';
import { insertUserSchema, selectUserSchema, users } from './schemas/users';




export const connectDb =({url, authToken}:{url:string, authToken?:string}) => {
    const client = createClient({url, authToken});
    return drizzle(client);
}

export { auth_keys, insertAuthKeySchema, insertSessionSchema, insertUserSchema, selectUserSchema, sessions, users };

