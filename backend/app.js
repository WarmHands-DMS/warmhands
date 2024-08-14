import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const port = 8800;
const app = express();

const corsOptions = {origin: process.env.CLIENT_URL, credentials: true}
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.listen(port, () => {
    console.log(`server is running on ${port}`);
})