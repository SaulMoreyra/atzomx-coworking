import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  passwordHash: string
): Promise<boolean> {
  return await bcrypt.compare(password, passwordHash);
}

export function hashToken(token: string): string {
  return bcrypt.hashSync(token, SALT_ROUNDS);
}

export function verifyTokenHash(token: string, tokenHash: string): boolean {
  return bcrypt.compareSync(token, tokenHash);
}
