declare module 'hono/adapter' {
  interface Env {
    AUTH_TOKEN: string;
    DATABASE_URL: string;
  }
}