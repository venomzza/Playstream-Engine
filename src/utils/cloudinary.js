import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'

 cloudinary.config({  
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,      //CLODINARY CONfig to setup api keys
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });


    
const uploadOnCloudinary = async(localFilepath) => {
    try {
        if(!localFilepath) return null   //upload the file on the clodinary
       const response = await cloudinary.uploader.upload(localFilepath, {
            resource_type:"auto"
        })   // file is uploaded successfully

        console.log("File uploaded successfully:", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilepath)  // delete the file from local server
        return null;

    }
}

export {uploadOnCloudinary};
    
