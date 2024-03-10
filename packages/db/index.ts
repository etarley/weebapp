import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { insertUserSchema, selectUserSchema, users } from './schemas/user';




export const connectDb =({url, authToken}:{url:string, authToken?:string}) => {
    const client = createClient({url, authToken});
    return drizzle(client);
}

export { insertUserSchema, selectUserSchema, users };
