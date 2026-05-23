import type { AuthUser, IPayload, IQuery } from "./issues.interface";
export declare const issuesService: {
    issuesCreateInDB: (payload: IPayload) => Promise<any>;
    getAllIssuesFromDB: (query: IQuery) => Promise<any[]>;
    getIssueBYIdFromDB: (id: string) => Promise<any>;
    updateIssueInDB: (id: string, payload: Partial<IPayload>, user: AuthUser) => Promise<any>;
    deleteIssueFromDB: (id: string) => Promise<any>;
};
//# sourceMappingURL=issues.service.d.ts.map