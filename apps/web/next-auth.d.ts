import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      fullName: string;
    };
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      fullName: string;
    };
    accessToken: string;
    refreshToken: string;
    error?: 'RefreshAccessTokenError';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      fullName: string;
    };
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    error?: 'RefreshAccessTokenError';
  }
}
