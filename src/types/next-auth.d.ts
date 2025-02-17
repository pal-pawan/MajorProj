import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string;
      username?: string;
      preparingFor: string[];
    } & DefaultSession['user'];
  }

  interface User {
    _id?: string;
    username?: string;
    preparingFor: string[];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id?: string;
    username?: string;
    preparingFor: string[];
  }
}