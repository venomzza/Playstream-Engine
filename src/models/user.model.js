import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        Username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim : true,
            index:true
        },

         email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim : true,
        },

         fullname: {
            type: String,
            required: true,
            
            trim : true,
            index:true
        },

         avatar: {
            type: String,    //cloudinary url
            required: true,
        },


        watchhistory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
          },

          password: {
              type: String,
              required: [true,'password is required']
          },

          refreshToken: {
              type: String,
          },

 })

   {
            timestamps: true  // automatically adds createdAt and updatedAt fields
          }



userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    
    this.password = bcrypt.hash(this.password,10)
    next()
}) // Hash password before saving

userSchema.methods.ispasswordCorrect= async  function (password) {
    return await bcrypt.compare(password, this.password)
}    //function used to check if password is correct or not


    export const User = mongoose.model("User", userSchema);