import { NextResponse } from "next/server";

export async function middleware(request) {
  console.log("🔹 Middleware executed for:", request.nextUrl.pathname);

  const authToken = request.cookies.get("__session")?.value;
  console.log("🔍 Auth Token:", authToken ? "Exists" : "Not Found");

  // Define public routes
  const publicRoutes = ["/", "/arena"];

  // Allow access to public routes
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    console.log("✅ Allowed public route:", request.nextUrl.pathname);
    return NextResponse.next();
  }

  // Redirect unauthenticated users from private routes
  if (!authToken) {
    console.log("⛔ Unauthorized access attempt to:", request.nextUrl.pathname);
    
    if (request.nextUrl.pathname.startsWith("/api")) {
      return NextResponse.json(
        {
          message: "You are not authorized to access this route",
          success: false,
        },
        { status: 401 }
      );
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("✅ Authorized access to:", request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!login|signup).*)", // Matches everything except login, signup, and API routes
  ],
};
