import { refreshToken, signIn } from '@pms/rest';
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { initClient } from './api';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const client = initClient();

          const { data, error } = await signIn({
            client,
            body: {
              email: credentials?.email ?? '',
              password: credentials?.password ?? '',
            },
          });

          if (error) return null;
          return { ...data.user, ...data };
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: { maxAge: 30 * 60 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      } else if (new Date().getTime() < token.expiresAt) {
        return token;
      }

      try {
        const client = initClient();
        const { data, error } = await refreshToken({
          client,
          body: { token: token.refreshToken },
        });
        if (error)
          return { ...token, error: 'RefreshAccessTokenError' as const };
        return { ...token, ...data };
      } catch (err) {
        return { ...token, error: 'RefreshAccessTokenError' as const };
      }
    },

    session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = token.user;

      return session;
    },
  },
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/auth/sign-out',
    error: '/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/',
  },
  debug: process.env.NODE_ENV === 'development',
};
