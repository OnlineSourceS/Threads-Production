import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {  authMiddleware  } from "@clerk/nextjs";
import { auth, currentUser, getAuth, redirectToSignIn } from '@clerk/nextjs/server';
 
let user ;
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({ debug: true }); // * gotta turn off hte debug mode


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
