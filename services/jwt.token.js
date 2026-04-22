import jwt from "jsonwebtoken"

async function jwtSign(userId){
    try{
        const JWT_SECRET = process.env.JWT_SECRET
        let token = jwt.sign({ id: userId }, JWT_SECRET, { "expiresIn": "1h" })
        return token
    }catch(er){
        console.error(er)
    }
}

export default jwtSign