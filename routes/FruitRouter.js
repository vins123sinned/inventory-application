import { Router } from "express";
import {
  getFruitsPage,
  getFruitPage,
  getFruitForm,
  postFruitForm,
  getEditFruitForm,
} from "../controllers/fruitController.js";

const fruitRouter = Router();

fruitRouter.get("/", getFruitsPage);
fruitRouter.get("/create", getFruitForm);
fruitRouter.post("/create", postFruitForm);
fruitRouter.get("/edit/:fruitId", getEditFruitForm);
fruitRouter.get("/:fruitId", getFruitPage);

export { fruitRouter };
