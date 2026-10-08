import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const ROLE_DASHBOARDS: Record<string, string> = {
  ADMIN: "/admin",
  PROVIDER: "/provider",
  RESIDENT: "/resident",
};

interface CustomJwtPayload {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "PROVIDER" | "RESIDENT";
  iat?: number;
  exp?: number;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;

  let role: CustomJwtPayload["role"] | undefined;

  if (accessToken) {
    try {
      const decoded = jwtDecode<CustomJwtPayload>(accessToken);
      role = decoded.role;
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  const isAuthenticated = !!accessToken;

  // Auth routes
  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  // Protected routes
  const isProtectedRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/provider") ||
    pathname.startsWith("/resident") ||
    pathname.startsWith("/profile");

  // Not logged in → login
  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // Already logged in → own dashboard
  if (isAuthenticated && isAuthRoute) {
    const dashboard =
      (role && ROLE_DASHBOARDS[role]) || "/resident";

    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  // Role-based protection
  if (isAuthenticated) {
    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return redirectToOwnDashboard(role, request);
    }

    if (pathname.startsWith("/provider") && role !== "PROVIDER") {
      return redirectToOwnDashboard(role, request);
    }

    if (pathname.startsWith("/resident") && role !== "RESIDENT") {
      return redirectToOwnDashboard(role, request);
    }
  }

  return NextResponse.next();
}

function redirectToOwnDashboard(
  role: CustomJwtPayload["role"] | undefined,
  request: NextRequest,
) {
  const dashboard =
    (role && ROLE_DASHBOARDS[role]) || "/";

  return NextResponse.redirect(new URL(dashboard, request.url));
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/provider/:path*",
    "/resident/:path*",
    "/profile/:path*",
    "/register",
    "/login",
  ],
};

export default proxy;