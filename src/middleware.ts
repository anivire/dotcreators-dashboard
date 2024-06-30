import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyRequestOrigin } from 'lucia';
import { GetServerSidePropsContext } from 'next';

export async function middleware(
  request: NextRequest,
  context: GetServerSidePropsContext
) {
  const session = request.cookies.get('lucia_session');
  const githubState = request.cookies.get('github_state');
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');

  if (
    (request.nextUrl.pathname.includes('dashboard') ||
      request.nextUrl.pathname === '/') &&
    session === undefined &&
    githubState === undefined
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth';
    return NextResponse.redirect(url);
  }

  if (isAuthPage && session && githubState) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  if (request.method === 'GET') {
    return NextResponse.next();
  }
  const originHeader = request.headers.get('Origin');
  const hostHeader = request.headers.get('Host');
  if (
    !originHeader ||
    !hostHeader ||
    !verifyRequestOrigin(originHeader, [hostHeader])
  ) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  return NextResponse.next();
}
