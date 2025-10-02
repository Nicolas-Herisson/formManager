import express from "express";
import dotenv from "dotenv";
import formRouter from "./routers/forms.router";
import responseRouter from "./routers/response.router";
import authRouter from "./routers/auth.router";
import userRouter from "./routers/user.router";
import inviteRouter from "./routers/invite.router";
import imageRouter from "./routers/image.router";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicPath = join(__dirname, "public");

app.use(
  cors({
    origin: process.env.FRONTEND_URL!,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(join(publicPath, "images")));
app.use(cookieParser());

app.use("/api", formRouter);
app.use("/api", responseRouter);
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", inviteRouter);
app.use("/api", imageRouter);
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.listen(process.env.LISTEN_PORT || 3000, () => {
  console.log(
    `Server is running on http://${process.env.LISTEN_HOST}:${process.env.LISTEN_PORT}`
  );
});
