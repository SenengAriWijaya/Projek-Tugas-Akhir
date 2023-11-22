import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { adminRouter } from "../route/admin-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { publicRouter } from "../route/public-api.js";
import { userRouter } from "../route/user-api.js";

dotenv.config();
export const web = express();
web.use(express.json());

web.use(adminRouter);
web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);

web.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
