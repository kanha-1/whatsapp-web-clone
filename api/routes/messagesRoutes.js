import express from "express"
import trimRequest from "trim-request"
import authMiddleware from "../middlewares/authMiddleware.js"
import { sendMessages, getMessages } from "../controllers/messagesController.js"
const router = express.Router()

router.route('/').post(trimRequest.all, authMiddleware, sendMessages)
router.route('/:convo_id').get(trimRequest.all, authMiddleware, getMessages)
export default router