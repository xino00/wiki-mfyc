import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
export async function middleware(request:NextRequest){const token=request.cookies.get("editor_session")?.value; if(token){try{await jwtVerify(token,new TextEncoder().encode(process.env.AUTH_SECRET??"development-only-secret-change-me")); return NextResponse.next()}catch{}} const login=new URL("/login",request.url); login.searchParams.set("next",request.nextUrl.pathname); return NextResponse.redirect(login)}
export const config={matcher:["/editor/:path*"]};
