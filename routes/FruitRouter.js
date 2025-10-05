import { Router } from "express";
import {
  getFruitsPage,
  getFruitPage,
  getFruitForm,
  postFruitForm,
  getEditFruitForm,
  postEditFruitForm,
  getDeleteFruit,
  postDeleteFruit,
} from "../controllers/fruitController.js";

const fruitRouter = Router();

fruitRouter.get("/", getFruitsPage);
fruitRouter.get("/create", getFruitForm);
fruitRouter.post("/create", postFruitForm);
fruitRouter.get("/edit/:fruitId", getEditFruitForm);
fruitRouter.post("/edit/:fruitId", postEditFruitForm);
fruitRouter.get("/delete/:fruitId", getDeleteFruit);
fruitRouter.post("/delete/:fruitId", postDeleteFruit);
fruitRouter.get("/:fruitId", getFruitPage);

export { fruitRouter };
