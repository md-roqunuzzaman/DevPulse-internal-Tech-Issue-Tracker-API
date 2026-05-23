import { pool } from "../../db";
import bcrypt from "bcrypt";
import type { CreateUserPayload } from "./auth.interface";
const createUserInDB = async (payload: CreateUserPayload) => {
  const { name, email, password, role } = payload;

  const hashPass = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4)
    RETURNING id,name,email,role,created_at, updated_at
        `,
    [name, email, hashPass, role || "contributor"],
  );
  return result.rows[0];
};

const getUserByEmail = async (email: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  return result.rows[0];
};
export const authService = {
  createUserInDB,
  getUserByEmail,
};
