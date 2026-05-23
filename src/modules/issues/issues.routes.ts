import { Router } from "express";
import { issuesController } from "./issues.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../../constants/constants";

const router = Router();
router.post(
  "/",
  auth(USER_ROLE.contributor, USER_ROLE.maintainer),
  issuesController.createIssue,
);
router.get("/", issuesController.getAllIssues);
router.get("/:id", issuesController.getIssueById);
router.put(
  "/:id",
  auth(USER_ROLE.contributor, USER_ROLE.maintainer),
  issuesController.updateIssue,
);
router.delete("/:id", auth(USER_ROLE.maintainer), issuesController.deleteIssue);
export const issuesRouter = router;
