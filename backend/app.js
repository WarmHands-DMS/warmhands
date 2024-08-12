import express from "express";
import bodyParser from "body-parser";
import authRoute from "./routes/auth.route.js";

const port = 8800;
const app = express();
app.use(bodyParser.json());

app.use("/api/auth", authRoute);

app.listen(port, () => {
    console.log(`server is running on ${port}`);
})