import jwt from "jsonwebtoken"

export const protect = async (req,res,next)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if (!token){
          return  res.status(401).json({ "message": "User authenticated !" })
        } 

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.id
        next()
    }catch(er){
        console.error(er)
        res.status(500).json({"message":"Internal server error"})
    }
}