import express from "express";
import dotenv from "dotenv";
import formRouter from "./routers/forms.router";
import responseRouter from "./routers/response.router";
import cors from "cors";

dotenv.config();


const app = express();

app.use(cors({
    origin: true,
    credentials: true // Allow cross-origin cookies to be sent
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use( '/api', formRouter );
app.use( '/api', responseRouter );

app.listen(process.env.LISTEN_PORT || 3000, () => {
    console.log(`Server is running on http://${process.env.LISTEN_HOST}:${process.env.LISTEN_PORT}`);
});