import "express-async-errors";
import cors from "cors";
import { config } from "dotenv";
import express from "express";

import { errorHandler } from "./api/middlewares/errorHandler";
import { userRouter } from "./api/routes/user.routes";
import { webhookRouter } from "./api/routes/webhook.routes";

import "./api/database";

config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/webhook", webhookRouter);
app.use("/api/v1/user", userRouter);
app.use(errorHandler);

app.listen(3333, () => console.log("Server is running on port 3333"));
