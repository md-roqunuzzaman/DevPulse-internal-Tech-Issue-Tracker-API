import type { Request, Response } from "express";
import { issuesService } from "./issues.service";
import type { AuthUser } from "./issues.interface";

const createIssue = async (req: Request, res: Response) => {
  try {
    const { title, description, type } = req.body;
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }
    const reporter_id = req.user?.id;

    const issue = await issuesService.issuesCreateInDB({
      title,
      description,
      type,
      reporter_id,
    });

    return res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: issue,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to create issue",
      error: error.message,
    });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const data = await issuesService.getAllIssuesFromDB(req.query);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch issues",
      error: error.message,
    });
  }
};

const getIssueById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const issue = await issuesService.getIssueBYIdFromDB(id as string);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: issue,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch issue",
      error: error.message,
    });
  }
};
const updateIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }
    const updatedIssue = await issuesService.updateIssueInDB(
      id as string,
      req.body,
      req.user as AuthUser,
    );

    return res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: updatedIssue,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to update issue",
      error: error.message,
    });
  }
};

const deleteIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedIssue = await issuesService.deleteIssueFromDB(id as string);
    if (!deletedIssue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete issue",
      error: error.message,
    });
  }
};

export const issuesController = {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
};
