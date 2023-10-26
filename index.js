import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet"
import ExpressMongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors"
import logger from "./config/logger.js";
import createHttpError from "http-errors";
import router from "./routes/index.js";
import mongoose from "mongoose";
import SocketServer from "./SocketServer.js";
import path from "path"
// soket
import { Server } from "socket.io";

const PORT = process.env.PORT || 8080;
const app = express();
dotenv.config();

// mongoDb connection
mongoose
    .connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        logger.info("database connected successfully");
    })
    .catch((err) => {
        logger.error(err.message);
    });

// exit mongodb server
mongoose.connection.on("error", (err) => {
    logger.error(`mongoDb connection Error :${err}`)
    process.exit(1)
})

// debug mongodb
if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true)
}

// using middlewares
app.use(cors())
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ExpressMongoSanitize()) //to add more security to db query request
app.use(cookieParser())
app.use(compression())
app.use(fileUpload({ useTempFiles: true }))

if (process.env.NODE_ENV !== "production") {
    app.use(morgan('dev'))
}

// config routing
app.use("/api", router)
// app.use(async (req, res, next) => {
//     next(createHttpError.NotFound("This Path dosn't exit"))
// })


// error handling
app.use(async (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

// deployment

const __dirname1 = path.resolve()
if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname1, "client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"));
    });
} else {
    app.get('/', (req, res) => {
        console.log(process.env.NODE_ENV, "process.env.NODE_ENV")
        res.send('app is running on development')
    })
}

let server = app.listen(PORT, () => {
    logger.info(`application running on port ${PORT}`)
    // throw new Error('error in server')
})


// socket io server
const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.CLIENT_URL
    }
})

io.on("connection", (socket) => {
    logger.info("socket io connected successfully")
    SocketServer(socket, io)
})
// Handel server errors
const existHandler = () => {
    if (server) {
        logger.info('server closed')
        process.exit(1)
    } else {
        process.exit(1)
    }
}
const unexpectedErrorHandeler = (error) => {
    logger.error(error)
    existHandler()
}

process.on("uncaughtException", unexpectedErrorHandeler)
process.on('unhandledRejection', unexpectedErrorHandeler)
