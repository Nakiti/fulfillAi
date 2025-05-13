import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import noteRoutes from "./routes/noteRoutes.js"
import gptRoutes from "./routes/gptRoutes.js"
import usageRoutes from "./routes/usageRoutes.js"
import stripeRoutes from "./routes/stripeRoutes.js"
import { db } from "./db.js"
import dotenv from "dotenv"
dotenv.config()

const app = express()

app.use((req, res, next) => {
   if (req.originalUrl === "/api/stripe/create-webhook") {
      next(); // Skip express.json for webhook
   } else {
      express.json()(req, res, next);
   }
});

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/notes", noteRoutes)
app.use("/api/gpt", gptRoutes)
app.use("/api/usage", usageRoutes)
app.use("/api/stripe", stripeRoutes)

app.get("/", (req, res) => {
   res.send("its running!")
})

const port = 4000

app.listen(port, () => {
   console.log("Server running on port", port)
   db.getConnection((err, connection) => {
      if (err) {
         console.error("Error connecting to the database:", err)
      } else {
         console.log("Database connected successfully!")
         connection.release()
      }
   });
})
