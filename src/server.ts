import "express-async-errors";
import cors from "cors";
import { config } from "dotenv";
import express from "express";

import { errorHandler } from "./api/middlewares/errorHandler";

config();
const app = express();

app.use(express.json());
app.use(cors());

app.use(errorHandler);

app.listen(3333, () => console.log("Server is running on port 3333"));
