import mongoose, {Schema} from "mongoose";  // schema add karke baad me mongoose.schema, baar baar likhna nhi parega
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const VideoSchema = new Schema(
    {

        videofile:{
            type: String, //cloudinary url
            required: true
        },

        thumbnail: {
            type: String, //cloudinary url
            required: true
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        duration: {
            type: Number,
            required: true
        },

        views: {
            type: Number,
            default: 0
        },

        ispublished: {
            type: Boolean,
            default: true
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

    },
   
    {
    timestamps: true
}

)


VideoSchema.plugin(mongooseAggregatePaginate);


export const video = mongoose.model("Video", VideoSchema)

