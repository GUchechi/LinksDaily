import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import linkRoutes from "./routes/link";
import connectDB from "./db/db.js";
const morgan = require("morgan");

dotenv.config();

connectDB();

const app = express();

// middlewares
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// route middlewares
app.use("/api", authRoutes);
app.use("/api", linkRoutes);

app.listen(8000, () => console.log("Server running on port 8000"));
