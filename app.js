import "dotenv/config";
import express from "express";
import path from "node:path";
import { indexRouter } from "./routes/indexRouter.js";
import { categoryRouter } from "./routes/categoryRouter.js";
import { fruitRouter } from "./routes/fruitRouter.js";
import { harvestRouter } from "./routes/harvestRouter.js";

const app = express();

const assetsPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/categories", categoryRouter);
app.use("/fruits", fruitRouter);
app.use("/harvest", harvestRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Listening on port ${PORT}`);
});
