import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../types";
export declare const auth: (...roles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=auth.d.ts.map