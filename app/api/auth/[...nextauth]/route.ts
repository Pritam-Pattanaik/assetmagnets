import NextAuth from 'next-auth/next';

// Import authOptions from a separate file to avoid Next.js App Router type conflicts
import { authOptions } from '@/utils/auth-options';

// Create the handler
const handler = NextAuth(authOptions);

// Export the handler functions directly
export const GET = handler;
export const POST = handler;