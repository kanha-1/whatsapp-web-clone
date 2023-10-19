import logger from "../config/logger.js";
import { createNewMessage, populateMessage, getUserConversationMessages } from "../services/messageService.js";
import { updateRecentMessages } from "../services/conversationService.js";
export const sendMessages = async (req, res, next) => {
    try {
        const user_id = req.user.userId;
        const { message, convo_id, files } = req.body
        if (!convo_id || (!message && !files)) {
            logger.error("Please provide convorsation Id and Message Body");
            return res.sendStatus(400)
        }
        const messageData = {
            sender: user_id,
            message,
            conversation: convo_id,
            files: files || []
        }
        let newMessage = await createNewMessage(messageData)
        let populatedMessage = await populateMessage(newMessage._id)
        await updateRecentMessages(convo_id, newMessage)
        res.json(populatedMessage)
    } catch (error) {
        next(error)
    }
}
export const getMessages = async (req, res, next) => {
    try {
        const convo_id = req.params.convo_id
        if (!convo_id) {
            logger.error("Please provide convorsation Id in params");
            return res.sendStatus(400)
        }
        const messages = await getUserConversationMessages(convo_id)
        res.json(messages)
    } catch (error) {
        next(error)
    }
}  