import { Router } from "express";
import {
  getFruitsPage,
  getFruitPage,
  getFruitForm,
} from "../controllers/fruitController.js";

const fruitRouter = Router();

fruitRouter.get("/", getFruitsPage);
fruitRouter.get("/create", getFruitForm);
fruitRouter.get("/:fruitId", getFruitPage);

export { fruitRouter };
