import express from "express"
import authRoutes from "./authRoutes.js"
import conversationRoutes from "./conversationRoutes.js"
import messagesRoutes from "./messagesRoutes.js"
import userRoutes from "./userRoutes.js"
const router = express.Router()

router.use("/auth", authRoutes)
router.use("/users", userRoutes)
router.use("/conversation", conversationRoutes)
router.use("/messages", messagesRoutes)

export default router