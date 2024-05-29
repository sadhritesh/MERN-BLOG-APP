import { json } from "express";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asycHandler.js";
import { uploadFileOnCloudinary }  from "../utils/cloudinary.js"


const updateProfile = asyncHandler( async(req, res) => {

    const { username, email, password } = req.body 
    const fileLocalPath = req?.file?.path

    console.log(fileLocalPath);

    const alreadyUsedEmail = await User.findOne({
        email: email
    })

    if (alreadyUsedEmail) {
        if (req.user.email !== email) {
            throw new ApiError(409, "User already exist")
        }
    }
    
    const response = await  uploadFileOnCloudinary(fileLocalPath)

    const user = await User.findById(req.user._id)

    user.username = username || req.user.username 
    user.email = email || req.user.email 
    user.password = password || req.user.password 
    user.profilePicture = response?.url || req.user.profilePicture

    await user.save()

    const updatedUser = await User.findById(req.user._id).select("-password -refreshToken")

    return res
    .json(
        new ApiResponse(
            200,
            updatedUser,
            "User details updated successfully"
        )
    )

})

const deleteUser = asyncHandler (async (req, res) => {

    const loggedInUser = req.user 
    const userId = loggedInUser._id

    const deletedUser = await User.findByIdAndDelete(userId)

    if (!deletedUser) {
        throw new ApiError (500, "Error occured, please try agin !")
    }

    return res
    .json(
        new ApiResponse (
            200,
            {},
            "User deleted successfully !"
        )
    )
})

export {
    updateProfile,
    deleteUser
}