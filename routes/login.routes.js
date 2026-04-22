import express from "express"
import { register, login } from "../controllers/login.controllers.js"
const router = express.Router()

export const registerRoute = router.post("/register", register)

export const loginRoute = router.post("/login", login)