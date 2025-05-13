import express from "express"
import { createUsage, getUsage, updateUsage } from "../controllers/usage.js"

const router = express.Router()

router.get("/get/:userId", getUsage)
router.get("/create", createUsage)
router.get("/update/:userId", updateUsage)

export default router