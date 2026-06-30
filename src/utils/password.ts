import { createHash } from "crypto";

// Simple hash using Node built-in crypto (no bcrypt needed)
export async function hashPassword(password: string): Promise<string> {
  return createHash("sha256").update(password + process.env.NEXTAUTH_SECRET).digest("hex");
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  const hashed = await hashPassword(password);
  return hashed === hash;
}
