import type { IssueStatus, IssueType, UserRole } from "../../types";
export interface IPayload {
    title: string;
    description: string;
    type: IssueType;
    reporter_id: number;
}
export interface IQuery {
    sort?: "newest" | "oldest";
    type?: IssueType;
    status?: IssueStatus;
}
export interface AuthUser {
    id: number;
    role: UserRole;
}
//# sourceMappingURL=issues.interface.d.ts.map