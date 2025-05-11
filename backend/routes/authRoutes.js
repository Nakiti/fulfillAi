import express from "express"
import { createUser, login, logout } from "../controllers/auth.js"

const router = express.Router()

router.post("/login", login)
router.post("/logout", logout)
router.post("/register", createUser)

export default router