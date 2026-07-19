import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDatabase from "./configs/database.js";
import "dotenv/config";
import userRouter from "./routes/User.route.js";

const app = express();
const port = process.env.PORT || 8088;

const allowedOrigins = ["http://localhost:5173"];

await connectDatabase();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (request, response) => response.send("API Working"));
app.use("/api/user", userRouter);

app.listen(port, async () => {
  console.log("Server Listening on PORT " + port);
});
