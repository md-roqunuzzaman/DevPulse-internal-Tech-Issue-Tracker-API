import type { CreateUserPayload } from "./auth.interface";
export declare const authService: {
    createUserInDB: (payload: CreateUserPayload) => Promise<any>;
    getUserByEmail: (email: string) => Promise<any>;
};
//# sourceMappingURL=auth.service.d.ts.map