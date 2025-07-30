// backend/middlewares/authMiddleware.js
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.js";  
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Note spelling fix
        const user = await User.findById(decoded.id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(401, "Invalid token");
        }

        req.user = user;
        next();
    } catch (error) {
        next(new ApiError(401, error.message || "Unauthorized request"));
    }
});
