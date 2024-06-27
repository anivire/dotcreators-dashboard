import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("accessToken");
	const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

	if (
		(request.nextUrl.pathname.includes("dashboard") ||
			request.nextUrl.pathname === "/") &&
		token === undefined
	) {
		const url = request.nextUrl.clone();
		url.pathname = "/auth";
		return NextResponse.redirect(url);
	}

	if (isAuthPage && token) {
		const url = request.nextUrl.clone();
		url.pathname = "/dashboard";
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}
