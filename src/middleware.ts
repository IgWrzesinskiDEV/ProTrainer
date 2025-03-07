import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";

  const path = request.nextUrl.pathname;

  const isMaintenancePage = path === "/maintenance";

  if (isMaintenanceMode && !isMaintenancePage) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * But include:
     * - API routes
     * - All page routes
     */
    "/((?!_next/static|_next/image).*)",
  ],
};
