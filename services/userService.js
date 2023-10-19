import createHttpError from "http-errors"
import UserModel from "../models/userModel.js"
export const findUser = async (userId) => {
    const user = await UserModel.findById(userId)
    if (!user) throw createHttpError.BadRequest("Unable to find the user")
    return user
}

export const searchUserService = async (keyword, userId) => {
    const user = await UserModel.find({
        // name: { $regex: keyword, $options: "i" }
        $or: [
            { name: { $regex: keyword, $options: "i" } },
            { name: { $regex: keyword, $options: "i" } }
        ]
    })
        // console.log(userId, "userId")
        .find({
            _id: { $ne: userId }
        })
    return user
}
