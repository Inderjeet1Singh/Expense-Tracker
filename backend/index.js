import express from "express";
import "dotenv/config.js";
import cors from "cors";
import connectDb from "./connections/db.js";
const app = express();
app.use(express.json());
app.use(cors());
connectDb();
app.get("/", (req, res) => {
  res.send("<h1>Server Running...</h1>");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});
