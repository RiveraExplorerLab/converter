import bcrypt from 'bcrypt';

const saltRounds = 10; //salt rounds for bcrypt

//hash a plaintext password using bcrypt
export async function hashPassword(plaintext) {
  return bcrypt.hash(plaintext, saltRounds);
}

//compare a plaintext password with a hashed password using bcrypt
export async function comparePassword(plaintext, hash) {
  return bcrypt.compare(plaintext, hash);
}
