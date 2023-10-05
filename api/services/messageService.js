import MessageModel from "../models/messagesModel.js"
import createHttpError from "http-errors"

export const createNewMessage = async (data) => {
    let newMessage = await MessageModel.create(data)
    if (!newMessage) throw createHttpError.BadRequest("Something Went wrong !")
    return newMessage
}

export const populateMessage = async (id) => {
    let message = await MessageModel.findById(id)
        .populate({
            path: "sender",
            select: "name picture",
            model: "UserModel"
        })
        .populate({
            path: "conversation",
            select: "name picture isGroup users",
            model: "ConversationModel",
            populate: {
                path: 'users',
                select: "name email picture status",
                model: "UserModel"
            }
        })
    if (!message) throw createHttpError.BadRequest("Something Went wrong !")
    return message
}
export const getUserConversationMessages = async (convo_id) => {
    const messages = await MessageModel.find({ conversation: convo_id })
        // console.log(messages, "messages")
        .populate("sender", "name picture email status")
        .populate("conversation")
    if (!messages) throw createHttpError.BadRequest("Something Went wrong !")
    return messages
}