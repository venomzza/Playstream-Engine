import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import { User } from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"  
import {ApiResponse} from "../utils/ApiResponse.js"

const generateAccessAndRefreshToken = async(userId) => {

    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })  // we are using validateBeforeSave false because we dont want to validate all the fields again while saving refresh token
        return { accessToken, refreshToken }

    } catch(error){
        throw new ApiError(500,"Error in generating tokens")





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






    const {fullname, email,username, password} = req.body
    console.log("email: ",email);
    console.log("password: ",password);
    // console.log("avatar: ",avatar.url);
    // console.log("cover image: ",coverImage.url);

    if(
        [fullname,email,username,password].some((field) => field?.trim()===" ")    // array is used to check all the at the once
    )
       
       {  throw new ApiError("Full name is required", 405);   }

    const existedUser =  await User.findOne({
        $or: 
          [  { email: email },
            { username: username } ]
         })
 
         if(existedUser){
            throw new ApiError(409,"User already exist with this email or username");
         }

const avatarLocalPath = req.files?.avatar[0]?.path              // this is used to check the local path of the avatar
const coverImageLocalPath = req.files?.coverImage[0]?.path      // this is used to check the local path of the profile

        if(!avatarLocalPath){
            throw new ApiError("Avatar is required", 400);
        }

       const avatar = await uploadOnCloudinary(avatarLocalPath)
       const coverImage = await uploadOnCloudinary(coverImageLocalPath)

       if(!coverImage){
           throw new ApiError("Cover image is required", 401);
       }
       if(!avatar){
        throw new ApiError("Avatar is required", 402);
       }

      const user =await User.create({
           fullname,
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

const loginUser = asyncHandler( async (req,res) => {
//req body -> data
// email or username
// find user
// check password 
// generate access token and refresh token
//sendcookie

const {email,username,password} = req.body

if( !username || !email){
    throw new ApiError(400, "username or email is required");
}


const user = await User.findOne({
    $or: [{username}, {email}]
})

if(!user){
    throw new ApiError(404, "User not found");
}


const isPasswordValid = await user.ispasswordCorrect(password)

if(!isPasswordValid){
    throw new ApiError(404, "Invalid credentials");
}

const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

const logedInUser = await User.findById(user._id).select(
    "-password -refreshToken"     // yaha select ke andar - lga ke jo likhenge wo exclude hoga.
)

const options = {
    httpOnly: true,  //now the cookie cannot be accessed via client side script it can be modified by server side only 
    secure: true,
}
  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(200, "User logged in successfully", {
        user: logedInUser,
        accessToken,
        refreshToken
    })
  )
})
export { registerUser, loginUser };
