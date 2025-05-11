import express from "express"
import { createNote, getNote, getNotesByUser, updateNote } from "../controllers/note.js"

const router = express.Router()

router.get("/getByUser/:userId", getNotesByUser)
router.get("/get/:noteId", getNote)
router.post("/create", createNote)
router.put("/update/:noteId", updateNote)

export default router