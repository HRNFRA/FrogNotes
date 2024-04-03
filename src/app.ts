// Desc: This file is the entry point of the application
import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import morgan from "morgan";
import env from "./utils/validateEnv";
import MongoStore from "connect-mongo";
import notesRoutes from "./routes/notes"
import userRoutes from "./routes/users"
import { requiresAuth } from "./middleware/auth"
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";


const app = express()

app.use(cors({
    origin: "https://frog-notes.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(morgan("dev"))

app.use(express.json())

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}))

app.use("/api/users", userRoutes)
app.use("/api/notes", requiresAuth, notesRoutes)

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint Not Found"))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
        let errorMessage = "An unknown error occurred"
        let statusCode = 500
        if (isHttpError(error)) {
            errorMessage = error.message
            statusCode = error.status
        }
        res.status(statusCode).json({error: errorMessage})
})


