import User from "../models/user.schema.js"

export const userData = async (req,res)=>{
    console.log(req.user)
    const userId = req.user
    const user = await User.findOne({ _id:userId })
    return res.status(200).json({user})
}