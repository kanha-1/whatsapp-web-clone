import mongoose from "mongoose"
import validator from "validator"
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: [true, "This email is already exit"],
        lowercase: true,
        validate: [validator.isEmail, "Please enter a valid emill"]
    },
    picture: {
        type: String,
        default: "https://res.cloudinary.com/dsseuwzzr/image/upload/v1599320656/nfwqmevulwuimrqbmcws.png"
    },
    status: {
        type: String,
        default: "Hey there ! i am using whatsapp"
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "please enter atlist 6 digit character"],
    }
}, {
    collection: "users",
    timestamps: true
})

const UserModel = mongoose.models.UserModel || mongoose.model('UserModel', userSchema)
export default UserModel