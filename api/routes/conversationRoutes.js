import express from "express"
import trimRequest from "trim-request"
import authMiddleware from "../middlewares/authMiddleware.js"
const router = express.Router()

router.route('/').post(trimRequest.all,authMiddleware)

export default router;
