import express from "express"
import { userData } from "../controllers/user.controllers.js"

const router = express.Router()

export const userDataRoute = router.post("/userData", userData)
