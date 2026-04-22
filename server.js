import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { registerRoute, loginRoute } from "./routes/login.routes.js"
import { userDataRoute } from "./routes/user.routes.js"
import { protect } from "./middlewares/auth.middleware.js"
dotenv.config()
import connectDb from "./config/db.js"


const app = express()
const PORT = process.env.PORT
const WHITELIST_IP = process.env.WHITELIST_CLIENT
const mongo_uri = process.env.MONGODB_URI
app.use(cors({ origin: [WHITELIST_IP]}))
app.use(express.json())



app.use("/api/auth", registerRoute)
app.use("/api/auth", loginRoute)
app.use("/middleware", protect,userDataRoute)

app.listen(PORT,async ()=>{
   await connectDb(mongo_uri)
    console.log("server is running on PORT :",PORT)
})

// check github actions ci/cd