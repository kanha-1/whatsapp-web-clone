import createHttpError from "http-errors"
import ConversationModel from "../models/conversationModel.js"
import UserModel from "../models/userModel.js"

export const isConversationExists = async (sender_Id, receiver_id) => {
    let chats = ConversationModel.find({
        isGroup: false,
        $and: [
            { users: { $elemMatch: { $eq: sender_Id } } },
            { users: { $elemMatch: { $eq: receiver_id } } }
        ]
    })
        .populate("users", "-password")
        .populate("recentMessage")
    if (!chats) throw createHttpError.BadRequest("Something Went wrong !")
    // populate message model
    chats = await UserModel.populate(chats, {
        path: "recentMessage.sender",
        select: "name email picture status"
    })
    return chats[0]
}

export const createConversation = async (data) => {
    const newConversation = await ConversationModel.create(data)
    if (!newConversation) throw createHttpError.BadRequest("Something Went wrong !")
    return newConversation
}

export const populateConversation = async (id, userData, removedField) => {
    let populateData = await ConversationModel.findOne({ _id: id }).populate(userData, removedField)
    if (!populateData) throw createHttpError.BadRequest("Something Went wrong !")
    return populateData
}
export const getUserConversation = async (user_id) => {
    let conversation
    await ConversationModel.find({
        users: { $elemMatch: { $eq: user_id } }
    })
        .populate("users", "-password")
        .populate("admin")
        .populate("recentMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
            results = await UserModel.populate(results, {
                path: "recentMessage.sender",
                select: "name email picture status"
            })
            conversation = results
        }).catch((err) => {
            throw createHttpError.BadRequest(err)
        })
    return conversation
}

export const updateRecentMessages = async (convo_id, message) => {
    const updateMessage = await ConversationModel.findByIdAndUpdate(convo_id, {
        recentMessage: message
    })
    if (!updateMessage) throw createHttpError.BadRequest("Something Went wrong !")
    return updateMessage
}