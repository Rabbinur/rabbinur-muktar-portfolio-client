import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Decode JWT payload (standard Edge/browser compatible decode)
function decodeJwt(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

// Verify JWT signature using native Web Crypto APIs (fully Vercel Edge compatible)
async function verifyJwtSignature(token: string, secret: string): Promise<boolean> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    
    const [header, payload, signature] = parts;
    const data = `${header}.${payload}`;
    
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    
    const sigBase64 = signature.replace(/-/g, "+").replace(/_/g, "/");
    const sigBinary = atob(sigBase64);
    const sigBytes = new Uint8Array(sigBinary.length);
    for (let i = 0; i < sigBinary.length; i++) {
      sigBytes[i] = sigBinary.charCodeAt(i);
    }
    
    const dataBytes = encoder.encode(data);
    return await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      dataBytes
    );
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;

  let isValid = false;
  let isExpired = true;

  if (accessToken) {
    // 1. Verify token signature
    isValid = await verifyJwtSignature(accessToken, JWT_SECRET);
    
    if (isValid) {
      // 2. Verify expiration
      const decoded = decodeJwt(accessToken);
      if (decoded && decoded.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        isExpired = currentTime >= decoded.exp;
      }
    }
  }

  const isAuthValid = accessToken && isValid && !isExpired;

  // Protect /dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!isAuthValid) {
      // Clear invalid cookie if present
      const response = NextResponse.redirect(new URL("/login", req.url));
      if (accessToken) {
        response.cookies.delete("accessToken");
      }
      return response;
    }
  }

  // Redirect to dashboard if logged-in user accesses login page
  if (pathname === "/login") {
    if (isAuthValid) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

// Scoped matcher config
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
