import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";

dotenv.config();

console.log("DATABASE:", process.env.DATABASE);
//create express app

const app = express();

//db
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log("DB Error ->", err);
  });

//apply middlewares

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route

// fs.readdirSync("./routes").forEach(async (r) => {
//   const route = await import(`./routes/${r}`);
//   app.use("/api", route.default);
// });

app.use("/api", authRoutes);

//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server is running on port ${port}`));
