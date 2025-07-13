import NextAuth from "next-auth";
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;
 
export const config = {
  matcher: [
    "/((?!api/|_next/static|_next/image|favicon\\.ico|.*\\.(?:png|gif|bpmn|webp|svg|jpg|jpeg|woff2)$).*)",
  ],
};
