import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import User from "../models/user.model.js"
import {uploadToCloudinary} from "../utils/cloudinary.js"  
import {ApiResponse} from "../utils/ApiResponse.js" 

const registerUser = asyncHandler(  async(req,res) =>{
    // res.status(200).json({
    //     message: "User registered successfully !", })

    //get user detail from frontend
    //validation - not empthy
    // check if user already exist:username,email
    //check avatar and profile image is avalable or not
    //upload themto cloudinary
    //create user object - create entry in db
    //remove password and refresh token failed from response
    // check for user creation
    //return respose






    const {fullName, email,userName, password} = req.body
    console.log("email: ",email);
    console.log("password: ",password);

    if(
        [fullName,email,username,password].some((field) => field?.trim()===" ")    // array is used to check all the at the once
    )
       
       {  throw new ApiError("Full name is required", 400);   }

    const existedUser =  User.findOne({
        $or: 
          [  { email: email },
            { userName: userName } ]
         })
 
         if(existedUser){
            throw new ApiError("User already exist with this email or username", 409);
         }

const avatarLocalPath = req.files?.avatar[0]?.path              // this is used to check the local path of the avatar
const coverImageLocalPath = req.files?.coverImage[0]?.path      // this is used to check the local path of the profile

        if(!avatarLocalPath){
            throw new ApiError("Avatar is required", 400);
        }

       const avatar = await uploadToCloudinary(avatarLocalPath)
       const coverImage = await uploadToCloudinary(coverImageLocalPath)

       if(!coverImage){
           throw new ApiError("Cover image is required", 400);
       }
       if(!avatar){
        throw new ApiError("Avatar is required", 400);
       }

      const user =await User.create({
           fullName,
           avatar: avatar.url,
           coverImage: coverImage?.url || "",
           email,
           password,
           username: username.toLowerCase()
       })

       const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"    // yaha select ke andar - lga ke jo likhenge wo exclude hoga.
       )

       if(!createdUser){
        throw new ApiError("User not created", 500);
       }

    return res.status(201).json(
        new ApiResponse(201, "User created successfully", createdUser)
    )

})

export { registerUser };
