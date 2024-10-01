import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authenticationMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized - User Not Found" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
}