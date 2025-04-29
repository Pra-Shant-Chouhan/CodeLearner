// TODO: we may need it later
// function asyncHandler(requestHandler){
//     return function(req, res, next){
//         Promise.resolve(requestHandler(req, res, next))
//         .catch(function(err){
//             next(err)
//         })
//     }
// }

const asyncHandler = (fn) => async (req, res, next) => {
    try {
        return  await fn(req, res, next)
    } catch (error) {
        console.error(error)
        res.status(error.code || 500).json({
            success:false,
            message:error.message
        })
    }
}

export {asyncHandler}





