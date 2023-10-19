import createHttpError from "http-errors";
import logger from "../config/logger.js";
import { isConversationExists, createConversation, populateConversation, getUserConversation } from "../services/conversationService.js";
import { findUser } from "../services/userService.js";
// import { createConversation } from "../services/conversationService.js";
export const create_new_conversation = async (req, res, next) => {
    try {
        const sender_Id = req.user.userId;
        const { receiver_id } = req.body
        // check receiver id
        if (!receiver_id) {
            logger.error('Please Provide userId to whom you want to start a conversation')
            throw createHttpError.BadGateway("Something Went Wrong")
        }
        // check if chat exists
        const existed_conversation = await isConversationExists(sender_Id, receiver_id)
        if (existed_conversation) {
            res.json(existed_conversation)
        } else {
            // let receiver_user_data = await findUser(receiver_id)
            let conversation_data = {
                name: "conversation name",
                picture: "conversation picture",
                isGroup: false,
                users: [sender_Id, receiver_id]
            }
            const newConversation = await createConversation(conversation_data)
            const popConvo = await populateConversation(newConversation._id, "users", "-password")
            res.status(200).json(popConvo)
        }
    } catch (error) {
        next(error)
    }
}
export const getConversation = async (req, res, next) => {
    try {
        const user_Id = req.user.userId;
        const conversation = await getUserConversation(user_Id)
        res.status(200).json(conversation)
    } catch (error) {
        next(error)
    }
}