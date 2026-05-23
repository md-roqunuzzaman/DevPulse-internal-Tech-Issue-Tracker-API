import type { Request, Response } from "express";
export declare const issuesController: {
    createIssue: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAllIssues: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getIssueById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateIssue: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteIssue: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=issues.controller.d.ts.map