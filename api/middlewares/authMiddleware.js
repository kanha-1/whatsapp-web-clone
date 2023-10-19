import createHttpError from "http-errors";
import jwt from "jsonwebtoken"
export default async function (req, res, next) {
    var authToken = req.header("Authorization");
    if (!authToken) {
        return next(createHttpError.Unauthorized())
    }
    const BearerToken = authToken.split(' ')[1]
    jwt.verify(BearerToken, process.env.ACCESS_TOKEN_KEY, (error, payload) => {
        if (error) {
            return next(createHttpError.Unauthorized())
        }
        req.user = payload
        next();
    })
}