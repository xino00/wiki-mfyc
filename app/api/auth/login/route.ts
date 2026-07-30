import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import type { EditorialRole } from "@/lib/workflow";
export async function POST(request:Request){const {email,password}=await request.json(); const user=await prisma.user.findUnique({where:{email},include:{roles:{include:{role:true}}}}); if(!user?.active||!await bcrypt.compare(password,user.passwordHash)) return NextResponse.json({error:"Credenciales inválidas"},{status:401}); const token=await createSession({sub:user.id,email:user.email,roles:user.roles.map(x=>x.role.name as EditorialRole)}); const response=NextResponse.json({ok:true}); response.cookies.set("editor_session",token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:28800}); return response;}
