import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Check if maintenance mode is enabled
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";

  // Get the path being requested
  const path = request.nextUrl.pathname;

  // Allow access to static assets and specific API endpoints even during maintenance
  //   const isAsset =
  //     path.startsWith("/_next") ||
  //     path.startsWith("/images") ||
  //     path.startsWith("/fonts") ||
  //     path.includes(".") || // Files with extensions (css, js, etc.)
  //     path === "/favicon.ico";

  // Allow access to the maintenance page itself
  const isMaintenancePage = path === "/maintenance";

  // If maintenance mode is enabled and the request is not for an asset or the maintenance page
  console.log("isMaintenanceMode", isMaintenanceMode);
  //   if (isMaintenanceMode && !isAsset && !isMaintenancePage) {
  //     const url = request.nextUrl.clone();
  //     url.pathname = "/maintenance";
  //     return NextResponse.rewrite(url);
  //   }

  if (isMaintenanceMode && !isMaintenancePage) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }
  return NextResponse.next();
}

// Configure the middleware to run on all paths except static assets
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
