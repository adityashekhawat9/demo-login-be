import bcrypt from "bcrypt"
import jwtSign from "../services/jwt.token.js"
import User from "../models/user.schema.js"

export const register = async (req,res)=>{
    try{
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ "message": "All fields required !" })
        }
        let user = await User.findOne({email})
        console.log(user)
        if (user) {
            return res.status(400).json({ "message": "Email already exist !" })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const response = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashPassword
        })
        return res.status(201).json({ "message": "Succesfully created", response })
    }catch(er){
        console.error(er.message)
        res.status(500).json({"message":"Internal server error"})
    }

}

export const login = async (req,res)=>{
    const {email,password} = req.body
    if (!email || !password) res.status(400).json({ "message": "All fields required !" })
    const user = await User.findOne({email})
    if (!user) res.status(400).json({ "message": "No user found !" })
    let matchPass = await bcrypt.compare(password,user.password)
    if(matchPass){
        let token = await jwtSign(user._id)
        return res.status(200).json({"message":"Succesfully login !",token})
    }
}