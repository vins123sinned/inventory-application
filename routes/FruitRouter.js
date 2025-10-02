import { Router } from "express";
import {
  getFruitsPage,
  getFruitPage,
  getFruitForm,
  postFruitForm,
  getEditFruitForm,
  postEditFruitForm,
} from "../controllers/fruitController.js";

const fruitRouter = Router();

fruitRouter.get("/", getFruitsPage);
fruitRouter.get("/create", getFruitForm);
fruitRouter.post("/create", postFruitForm);
fruitRouter.get("/edit/:fruitId", getEditFruitForm);
fruitRouter.post("/edit/:fruitId", postEditFruitForm);
fruitRouter.get("/:fruitId", getFruitPage);

export { fruitRouter };
