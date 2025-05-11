import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import noteRoutes from "./routes/noteRoutes.js"
import gptRoutes from "./routes/gptRoutes.js"
import { db } from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const corsOptions = {
   origin: ["https://icy-hill-05965451e.4.azurestaticapps.net", "http://localhost:3000"],
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization'],
   credentials: true, 
}; 

const app = express()

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/notes", noteRoutes)
app.use("/api/gpt", gptRoutes)

app.get("/", (req, res) => {
   res.send("its running!")
})

const port = 4000

app.listen(port, (req, res) => {
   console.log("runninnnnnnnnnnnn")
   db.getConnection((err, connection) => {
      if (err) {
         console.error("Error connecting to the database:", err);
      } else {
         console.log("Database connected successfully!");
         connection.release()
      }
   });
})