import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


const isPublicRoute = createRouteMatcher(['/sign-in', '/sign-up', '/'])
const isAuthRoute = createRouteMatcher(['/sign-in', '/sign-up'])

export default clerkMiddleware((auth, req) => {

    const { userId } = auth()
    const currentURL = req.nextUrl.pathname

    if (userId && isAuthRoute(req)) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    if (!userId && currentURL.startsWith('/test')) {
        return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    return NextResponse.next()

});

export const config = {
    matcher: [
        // Exclude paths with a dot, Next.js internals, and specifically exclude /api/socket/io
        '/((?!.*\\..*|_next|api/socket/io).*?)',
        // Include the root path
        '/',
        // Include paths starting with /api and /trpc, but exclude /api/socket/io
        '/(api(?!/socket/io)|trpc)(.*)'
    ],
};
