import mongoose from "mongoose";
import { ObjectId } from mongoose.Schema.Types
const conversationSchema = mongoose.Schema({
    name: {
        name: String,
        required: [true, "COnversation is required"],
        trim: true
    },
    isGroup: {
        type: Boolean,
        required: true,
        default: false
    },
    user: [
        {
            type: ObjectId,
            ref: "userModel"

        }
    ],
    recentMessage: {
        type: ObjectId,
        ref: "MessageModel"
    },
    admin: {
        type: ObjectId,
        ref: "userModel"
    }
}, {
    collection: "conversation",
    timeStamps: true
})


const ConversationModel = mongoose.models.conversationModel || mongoose.model("conversationModel", conversationSchema)
export default ConversationModel
