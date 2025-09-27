import { Router } from "express";
import {
  getFruitsPage,
  getFruitPage,
  getFruitForm,
  postFruitForm,
} from "../controllers/fruitController.js";

const fruitRouter = Router();

fruitRouter.get("/", getFruitsPage);
fruitRouter.get("/create", getFruitForm);
fruitRouter.post("/create", postFruitForm);
fruitRouter.get("/:fruitId", getFruitPage);

export { fruitRouter };
