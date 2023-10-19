import createHttpError from "http-errors"
import validator from "validator"
import UserModel from "../models/userModel.js"
import bcrypt from "bcrypt"
// import { UserModel } from "../models/index.js"
const { DEFAULT_USER_PICTURE, DEFAULT_USER_STATUS } = process.env
export const createUser = async (userData) => {
    const { name, email, password, picture, status } = userData

    // validate user data
    if (!name || !email || !password) {
        throw createHttpError.BadRequest("Please fill all the fields")
    }

    // check lenth of name
    if (!validator.isLength(name, { min: 3, max: 60 })) {
        throw createHttpError.BadRequest("Please make sure name character is between 3 to 60")
    }

    // check length of status
    if (status && status.length > 64) {
        throw createHttpError.BadRequest("Make sure your status is less than 64 character .")
    }

    // check email address if valid
    if (!validator.isEmail(email)) {
        throw createHttpError.BadRequest("Please enter a valid email address")
    }

    // check user if alredy exit
    const checkDB = await UserModel.findOne({ email })
    if (checkDB) {
        throw createHttpError.Conflict("This email is already exit ! Please try with a new one")
    }

    // check length of password
    if (!validator.isLength(password, { min: 6, max: 18 })) {
        throw createHttpError.BadRequest("Please make sure password character is between 6 to 18")
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await new UserModel({
        name,
        email,
        picture: picture || DEFAULT_USER_PICTURE,
        status: status || DEFAULT_USER_STATUS,
        password: hashedPassword
    }).save()
    return user
}

export const loginUser = async (email, password) => {
    const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();
    // chekc email exit or not
    if (!user) throw createHttpError.NotFound(" Ahh ! Seems Like this email dosn't exit ");

    // compare password
    let comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) throw createHttpError.NotFound("Wrong Password")
    return user;
}