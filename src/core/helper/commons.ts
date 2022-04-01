import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string, saltOrRounds: 10) {
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
}
