import express from "express"
import { createUser, getCurrentUser, login, logout } from "../controllers/auth.js"

const router = express.Router()

router.post("/login", login)
router.post("/logout", logout)
router.post("/register", createUser)
router.get("/getCurrentUser", getCurrentUser)

export default router