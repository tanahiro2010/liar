import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authClient } from './lib/auth-client';

export default async function proxy(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-pathname', request.nextUrl.pathname);
    const session = await authClient.getSession();
    requestHeaders.set('x-is-authenticated', session.data ? 'true' : 'false');

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
