import { jwtVerify, SignJWT } from "jose";
import type { EditorialRole } from "./workflow";

const secret = () => new TextEncoder().encode(process.env.AUTH_SECRET ?? "development-only-secret-change-me");
export type Session = { sub: string; email: string; roles: EditorialRole[] };
export async function createSession(session: Session) {
  return new SignJWT({ email: session.email, roles: session.roles }).setProtectedHeader({ alg: "HS256" }).setSubject(session.sub).setIssuedAt().setExpirationTime("8h").sign(secret());
}
export async function readSession(request: Request): Promise<Session | null> {
  const cookie = request.headers.get("cookie")?.match(/(?:^|; )editor_session=([^;]+)/)?.[1];
  if (!cookie) return null;
  try {
    const { payload } = await jwtVerify(cookie, secret());
    return { sub: String(payload.sub), email: String(payload.email), roles: (payload.roles ?? []) as EditorialRole[] };
  } catch { return null; }
}
