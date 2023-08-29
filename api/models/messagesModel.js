import mongose from "mongoose"
const { ObjectId } = mongose.Schema.Types
const MessageSchema = mongose.Schema({
    sender: {
        type: ObjectId,
        ref: "UserModel"
    },
    message: {
        type: String,
        trim: true
    },
    conversation: {
        type: ObjectId,
        ref: "ConversationModel"
    },
    files: []
}, {
    collection: "messages",
    timestamps: true
})

const MessageModel = mongose.models.MessageModel || mongose.Schema("MessageModel", MessageSchema)
export default MessageModel 
