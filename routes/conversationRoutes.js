import express from "express"
import trimRequest from "trim-request"
import authMiddleware from "../middlewares/authMiddleware.js"
import { create_new_conversation, getConversation } from "../controllers/conversationController.js"
const router = express.Router()

router.route('/').post(trimRequest.all, authMiddleware, create_new_conversation)
router.route('/').get(trimRequest.all, authMiddleware, getConversation)

export default router;