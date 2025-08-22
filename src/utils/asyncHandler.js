// const asyncHandler = () => {}



export {asyncHandler}




const asyncHandler = (fn) => async(req, res, next) => {         // check
    try {
        await fn(req, res, next);
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}
