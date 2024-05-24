import express from "express";
import cors from "cors";
import appRouter from "./routes/router";
import httpStatus from "http-status";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.use("/api", appRouter);
app.use(globalErrorHandler);

app.use((req, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: `${req.method} ${req.originalUrl} API not found`,
  });
});

export default app;
