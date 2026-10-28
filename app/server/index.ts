import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
  })
);

app.use("/api", chatRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});