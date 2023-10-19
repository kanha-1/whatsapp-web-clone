// import { verify } from "jsonwebtoken"
import { sign, verify } from "../utils/tokenUtils.js"
export const generateScretToken = async (payload, expireTime, secret) => {
    let token = await sign(payload, expireTime, secret)
    return token
}
export const verifyToken = async (token, secret) => {
    let checkToken = await verify(token, secret)
    return checkToken
}