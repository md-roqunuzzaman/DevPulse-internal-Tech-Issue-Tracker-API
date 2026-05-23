import { pool } from "../../db";
const issuesCreateInDB = async (payload) => {
    const { title, description, type, reporter_id } = payload;
    const result = await pool.query(`INSERT INTO issues(title,description,type,reporter_id)
        VALUES($1,$2,$3,$4) RETURNING *`, [title, description, type, reporter_id]);
    return result.rows[0];
};
const getAllIssuesFromDB = async (query) => {
    const { sort = "newest", type, status } = query;
    let basicQuery = `SELECT * FROM issues`;
    const values = [];
    const conditions = [];
    if (type) {
        values.push(type);
        conditions.push(`type=$${values.length}`);
    }
    if (status) {
        values.push(status);
        conditions.push(`status=$${values.length}`);
    }
    if (conditions.length > 0) {
        basicQuery += ` WHERE ${conditions.join(" AND ")}`;
    }
    if (sort === "newest") {
        basicQuery += ` ORDER BY created_at DESC`;
    }
    else if (sort === "oldest") {
        basicQuery += ` ORDER BY created_at ASC`;
    }
    const result = await pool.query(basicQuery, values);
    const issues = result.rows;
    const formattedIssues = await Promise.all(issues.map(async (issue) => {
        const result = await pool.query(`SELECT id,name,role FROM users WHERE id=$1`, [issue.reporter_id]);
        return {
            ...issue,
            reporter: result.rows[0],
        };
    }));
    return formattedIssues;
};
const getIssueBYIdFromDB = async (id) => {
    const result = await pool.query(`SELECT * FROM issues WHERE id=$1`, [id]);
    const issue = result.rows[0];
    if (!issue)
        return null;
    const reporterData = await pool.query(`SELECT id,name,role FROM users WHERE id=$1`, [issue.reporter_id]);
    return {
        ...issue,
        reporter: reporterData.rows[0] || null,
    };
};
const updateIssueInDB = async (id, payload, user) => {
    const issueResult = await pool.query(`SELECT * FROM issues WHERE id=$1`, [
        id,
    ]);
    const issue = issueResult.rows[0];
    if (!issue) {
        throw new Error("Issue not found");
    }
    if (user.role === "contributor") {
        if (issue.reporter_id !== user.id) {
            throw new Error("Unauthorized to update this issue");
        }
        if (issue.status !== "open") {
            throw new Error("You can only update open issues");
        }
    }
    const { title, description, type } = payload;
    const result = await pool.query(`UPDATE issues SET title = COALESCE($1, title),
      description = COALESCE($2, description),
      type = COALESCE($3, type),
      updated_at = NOW() WHERE id=$4 RETURNING *`, [title, description, type, id]);
    return result.rows[0];
};
const deleteIssueFromDB = async (id) => {
    const result = await pool.query(`DELETE FROM issues WHERE id=$1 RETURNING *`, [id]);
    return result.rows[0];
};
export const issuesService = {
    issuesCreateInDB,
    getAllIssuesFromDB,
    getIssueBYIdFromDB,
    updateIssueInDB,
    deleteIssueFromDB,
};
//# sourceMappingURL=issues.service.js.map