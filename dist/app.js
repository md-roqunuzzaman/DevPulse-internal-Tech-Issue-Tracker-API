import express, {} from "express";
import { authRouter } from "./modules/auth/auth.routes";
import { issuesRouter } from "./modules/issues/issues.routes";
export const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/issues", issuesRouter);
app.get("/", (req, res) => {
    res.status(200).json({ message: "Express server is running successfully" });
});
//# sourceMappingURL=app.js.map