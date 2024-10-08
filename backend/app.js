import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';

import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js"
import userRoute from "./routes/user.route.js"

const port = 8800;
const app = express();

const corsOptions = {origin: process.env.CLIENT_URL, credentials: true}
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/test", testRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(port, () => {
    console.log(`server is running on ${port}`);
})