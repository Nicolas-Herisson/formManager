import express from "express";
import dotenv from "dotenv";


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(process.env.LISTEN_PORT || 3000, () => {
    console.log(`Server is running on http://${process.env.LISTEN_HOST}:${process.env.LISTEN_PORT}`);
});