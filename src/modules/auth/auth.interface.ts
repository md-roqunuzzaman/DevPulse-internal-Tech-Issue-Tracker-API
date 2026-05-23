import type { UserRole } from "../../types";

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}
