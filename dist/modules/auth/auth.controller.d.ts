import type { Request, Response } from "express";
export declare const authController: {
    signupUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    loginUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=auth.controller.d.ts.map