import config from "../config";
import { pool } from "../db";
import jwt, {} from "jsonwebtoken";
export const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            console.log("token in middleware", token);
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "unauthorized access",
                });
            }
            const decode = jwt.verify(token, config.secret);
            const userData = await pool.query(`SELECT * FROM users WHERE id=$1`, [
                decode.id,
            ]);
            const user = userData.rows[0];
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "user not found",
                });
            }
            if (roles.length && !roles.includes(user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden!! This role has no access!",
                });
            }
            req.user = user;
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
//# sourceMappingURL=auth.js.map