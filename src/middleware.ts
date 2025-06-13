import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.has("loggedIn");
  return isLoggedIn
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/signin", request.url));
}

export const config = {
  matcher: ["/profile", "/reservation", "/experience/", "/calendar"],
};
