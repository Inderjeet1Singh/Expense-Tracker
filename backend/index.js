import express from "express";
import "dotenv/config.js";
import cors from "cors";
import connectDb from "./connections/db.js";
import authRoutes from "./routes/authRoutes.js";
const app = express();
app.use(express.json());
app.use(cors());
connectDb();
app.get("/", (req, res) => {
  res.send("<h1>Server Running...</h1>");
});
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});
