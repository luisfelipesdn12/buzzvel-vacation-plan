import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { Database } from "./lib/database.types";

/**
 * Creates a Supabase client configured to use cookies and refreshes the session if expired,
 * with a configuration to match relevant paths excluding specific ones.
 * @param {NextRequest} req - `req` is the request object that contains information about the incoming
 * HTTP request, such as headers, cookies, query parameters, and more. In this context, it is
 * specifically a `NextRequest` object used in a Next.js middleware function.
 * @returns The `middleware` function is returning the `res` object, which is a NextResponse object.
 * This object is being returned after creating a Supabase client configured to use cookies, refreshing
 * the session if expired, and setting up the middleware for relevant paths.
 */
export async function middleware(req: NextRequest) {
    const res = NextResponse.next();

    // Create a Supabase client configured to use cookies
    const supabase = createMiddlewareClient<Database>({ req, res });

    // Refresh session if expired - required for Server Components
    await supabase.auth.getSession();

    return res;
}

// Ensure the middleware is only called for relevant paths.
export const config = {
    matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
