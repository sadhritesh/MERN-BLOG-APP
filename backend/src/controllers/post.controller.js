import Post from "../models/post.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asycHandler.js";
import { uploadFileOnCloudinary }  from "../utils/cloudinary.js"


const createPost = asyncHandler( async (req, res) => {
    
    const fileLocalPath = req?.file?.path

    if (!req.user.isAdmin) {
        throw new ApiError (403, "Only admin can create the Post")
    }

    if (!req.body.title || !req.body.content) {
        throw new ApiError (400, "PLease provide all the required fields")
    }

    const isTitleExist = await Post.findOne({
        "title": req.body.title
    })

    if (isTitleExist) {
        throw new ApiError(409, "Post with the same title exist")
    }

    const response = await  uploadFileOnCloudinary(fileLocalPath)

    const slug = req.body.title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, "")

    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user._id,
        blogPost: response?.url || "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png"
    })

    const savedPost = await newPost.save()

    return res 
    .status(200)
    .json(
        new ApiResponse (
            200, 
            savedPost,
            "Post created successfully"
        )
    )
})

export {
    createPost
}