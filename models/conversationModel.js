import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types
const conversationSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Conversation is required"],
        trim: true
    },
    picture: {
        type: String,
        required: true
    },
    isGroup: {
        type: Boolean,
        required: true,
        default: false
    },
    users: [
        {
            type: ObjectId,
            ref: "UserModel"

        }
    ],
    recentMessage: {
        type: ObjectId,
        ref: "MessageModel"
    },
    admin: {
        type: ObjectId,
        ref: "UserModel"
    }
}, {
    collection: "conversation",
    timestamps: true
})


const ConversationModel = mongoose.models.ConversationModel || mongoose.model("ConversationModel", conversationSchema)
export default ConversationModel