import express from "express"
import { register, login, logout, refreshToken } from "../controllers/authController.js"
import TrimRequest from "trim-request"
import authMiddleware from "../middlewares/authMiddleware.js"
const router = express.Router()

router.route('/register').post(TrimRequest.all, register)
router.route('/login').post(TrimRequest.all, login)
router.route('/logout').post(TrimRequest.all, logout)
router.route('/refreshToken').post(TrimRequest.all, refreshToken)
router.route('/protected').get(TrimRequest.all, authMiddleware, (req, res) => {
    res.send("hello")
})

export default router