import createHttpError from "http-errors";
import { createUser, loginUser } from "../services/AuthService.js"
import { generateScretToken, verifyToken } from "../services/generateTokenServices.js";
import { findUser } from "../services/userService.js";
export const register = async (req, res, next) => {
    try {
        const { name, email, password, picture, status } = req.body
        const newUser = await createUser({
            name,
            email,
            password,
            picture,
            status
        });
        const access_token = await generateScretToken(
            { userId: newUser._id }, "1d", process.env.ACCESS_TOKEN_KEY
        )
        const refresh_token = await generateScretToken(
            { userId: newUser._id }, "5d", process.env.REFRESH_TOKEN_KEY
        )
        res.cookie('refreshToken',
            refresh_token, {
            httpOnly: true,
            path: "http://localhost:8080/api/auth/refreshToken",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        })
        res.json({
            Message: "Register Successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                picture: newUser.picture,
                status: newUser.status,
                token:access_token
            }
        });
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user_data = await loginUser(email, password)
        const access_token = await generateScretToken(
            { userId: user_data._id }, "1d", process.env.ACCESS_TOKEN_KEY
        )
        const refresh_token = await generateScretToken(
            { userId: user_data._id }, "5d", process.env.REFRESH_TOKEN_KEY
        )
        res.cookie('refreshToken',
            refresh_token, {
            httpOnly: true,
            path: "http://localhost:8080/api/auth/refreshToken",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        })
        res.json({
            Message: "Register Successfully",
            user: {
                _id: user_data._id,
                name: user_data.name,
                email: user_data.email,
                picture: user_data.picture,
                status: user_data.status,
                token:access_token
            }
        });
    } catch (error) {
        next(error)
    }
}

export const logout = async (req, res, next) => {
    try {
        res.clearCookie("refreshToken", { path: "http://localhost:8080/api/auth/refreshToken" })
        res.json({ message: "Logged out successfully !" })
    } catch (error) {
        next(error)
    }
}

export const refreshToken = async (req, res, next) => {
    try {
        const refresh_token = req.cookies.refreshToken
        if (!refresh_token) throw createHttpError.Unauthorized("Please Login")
        const checkToken = await verifyToken(refresh_token, process.env.REFRESH_TOKEN_KEY)
        const user = await findUser(checkToken.userId)
        const access_token = await generateScretToken(
            { userId: user._id }, "1d", process.env.ACCESS_TOKEN_KEY
        )
        res.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                status: user.status,
                token:access_token
            }
        });
    } catch (error) {
        next(error)
    }
}