import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import eventRoutes from "./routes/eventRoutes.js"
import ticketRoutes from "./routes/ticketRoutes.js"

dotenv.config();

const app=express()
connectDB()

app.use(
  cors({
    origin: (origin, callback) =>{
      if(!origin) 
        return callback(null, true)
      if(origin === "http://localhost:5173" || origin === "http://localhost:5174" || origin.endsWith(".vercel.app"))
      {
        return callback(null, true)
      }
      return callback(new Error("Not allowed by cors"))
    },
    credentials:true
  })
);
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("API running")
})

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/api/events", eventRoutes)

app.use("/api/tickets", ticketRoutes)