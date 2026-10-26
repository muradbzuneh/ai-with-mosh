import express from "express";
import cors from "cors";
import type { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200
};



const app = express();
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  res.send(process.env.OPENAI_API_KEY || "No API key found");
});

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});