import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";

  const path = request.nextUrl.pathname;

  const isMaintenancePage = path === "/maintenance";
  const isPublicAsset =
    path.startsWith("/favicon") ||
    path.startsWith("/images") || // Example for static images in /public/images
    path.startsWith("/logo") ||
    path.startsWith("/screenshots") ||
    path === "/robots.txt" || // Allow robots.txt
    path === "/site.webmanifest" || // Allow site manifest
    path === "/favicon/manifest.json" ||
    path.endsWith(".ico") ||
    path.endsWith(".png") ||
    path.endsWith(".jpg") ||
    path.endsWith(".jpeg") ||
    path.endsWith(".svg") ||
    path.endsWith(".webp") ||
    path.endsWith(".json");
  if (isMaintenanceMode && !isMaintenancePage && !isPublicAsset) {
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
    "/((?!_next/static|_next/image|favicon.ico|favicon/.*|images/.*|screenshots/.*|logo/.*|robots.txt|site.webmanifest|favicon/manifest.json).*)",
  ],
};
