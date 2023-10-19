import express from "express"
import { searchUsers } from "../controllers/userController.js"
import TrimRequest from "trim-request"
import authMiddleware from "../middlewares/authMiddleware.js"
const router = express.Router()

router.route('/').get(TrimRequest.all, authMiddleware, searchUsers)

export default router