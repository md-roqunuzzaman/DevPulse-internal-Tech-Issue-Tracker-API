import { authService } from "./auth.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
const signupUser = async (req, res) => {
    const { email } = req.body;
    try {
        const existingUser = await authService.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        const user = await authService.createUserInDB(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Signup failed",
            error: error.message,
        });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        console.log(user.password);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        const token = jwt.sign({
            id: user.id,
            name: user.name,
            role: user.role,
        }, config.secret, { expiresIn: "7d" });
        console.log("token", token);
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    created_at: user.created_at,
                    updated_at: user.updated_at,
                },
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Login failed",
        });
    }
};
export const authController = {
    signupUser,
    loginUser,
};
//# sourceMappingURL=auth.controller.js.map