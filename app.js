import "dotenv/config";
import express from "express";
import { indexRouter } from "./routes/indexRouter.js";
import { categoryRouter } from "./routes/categoryRouter.js";
import { produceRouter } from "./routes/produceRouter.js";

const app = express();

app.use("/", indexRouter);
app.use("/categories", categoryRouter);
app.use("/produce", produceRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Listening on port ${PORT}`);
});
