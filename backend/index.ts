import express from "express";
import dotenv from "dotenv";
import formRouter from "./routers/forms.router";
import responseRouter from "./routers/response.router";
import authRouter from "./routers/auth.router";
import userRouter from "./routers/user.router";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();


const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL!,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

app.use( '/api', formRouter );
app.use( '/api', responseRouter );
app.use( '/api', authRouter );
app.use( '/api', userRouter );

app.listen(process.env.LISTEN_PORT || 3000, () => {
    console.log(`Server is running on http://${process.env.LISTEN_HOST}:${process.env.LISTEN_PORT}`);
});