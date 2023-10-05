import createHttpError from "http-errors"
import logger from "../config/logger.js"
import { searchUserService } from "../services/userService.js"
export const searchUsers = async (req, res, next) => {
    try {
        const searchedWord = req.query.search
        if (!searchedWord) {
            logger.error("please enyter some keyword")
            throw createHttpError.BadRequest("Something Went wrong !")
        }
        const searchedUser = await searchUserService(searchedWord, req.user.userId)
        res.status(200).json(searchedUser)
    } catch (error) {
        next(error)
    }
}