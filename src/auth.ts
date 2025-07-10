import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import fs from 'fs';
import yaml from 'js-yaml';

interface Config {
  USERS: { [key: string]: { email: string; role: string; password: string; type: string } }
}

// Type guard function
function isValidConfig(obj: unknown): obj is Config {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'USERS' in obj &&
    typeof (obj as any).USERS === 'object' &&
    !Array.isArray((obj as any).USERS)
  );
}

async function getUser(username: string, password: string) {
  try {
    const configData = yaml.load(fs.readFileSync('/app/config.yml', 'utf8'));
    
    if (!isValidConfig(configData)) {
      console.error('Invalid config structure');
      return undefined;
    }
    
    //console.log('Config USERS:', configData.USERS);
    
    const user = configData.USERS[username];
    if (user && user.password === password) {
      return {
        email: user.email,
        name: username,
        image: user.role,
      };
    }
    
    console.log('User not found or password mismatch');
    return undefined;

  } catch (error) {
    console.error('Error loading config:', error);
    return undefined;
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials);
        
        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          let user = await getUser(username, password);
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (typeof token.user === 'string') {
        session.user.name = token.user;
      }
      return session;
    },
  },
});