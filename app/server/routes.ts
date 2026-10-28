import { Router } from "express";
import { handleChat, getHello } from "./controller/chat.controller";

const router = Router();

router.post("/chat", handleChat);
router.get("/hello", getHello);

export default router;