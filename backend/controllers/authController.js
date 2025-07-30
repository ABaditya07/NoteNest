import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
// import { generateAccessAndRefereshTokens } from "../utils/tokenUtils.js"; // Assuming you have a utility function for token generation
// Register new user


const generateAccessAndRefreshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const signup =  asyncHandler( async (req, res) => {
  const { name, email, password } = req.body;

  if(!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

   const userExists= await User.findOne({
       $or:[{name},{email}]
   })

    if (userExists)
      throw new ApiError(400, "User already exists");
     
     const user =await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
     })
     const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
     if (!createdUser) {
        throw new ApiError(500, "User creation failed");
     }

     return res.status(201).json(
        new ApiResponse(201, createdUser, "User created successfully")
     )
  } 
)

const login = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  if (!name && !email) {
    throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({
    $or: [{ name }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // ✅ Add this block to check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  // Tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});


const logout = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    throw new ApiError(400, "User ID is required for logout");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.refreshToken = null;
  await user.save();

  // Also clear token cookie if used
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json(
    new ApiResponse(200, null, "User logged out successfully")
  );
});



export { signup, login, logout };