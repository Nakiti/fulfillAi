import express from "express"
import { getCurrentUser } from "../controllers/user.js"

const router = express.Router()

router.get("/get/:id", getCurrentUser)

export default router