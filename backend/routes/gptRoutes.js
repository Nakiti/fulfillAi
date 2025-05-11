import express from "express"
import { autofill, createTitle } from "../controllers/gpt.js"

const router = express.Router()

router.post("/autofill", autofill)
router.post("/createTitle", createTitle)


export default router