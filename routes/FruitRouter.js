import { Router } from "express";
import {
  getFruitsPage,
  getFruitPage,
  getFruitForm,
} from "../controllers/fruitController.js";

const fruitRouter = Router();

fruitRouter.get("/", getFruitsPage);
fruitRouter.get("/:produceId", getFruitPage);
fruitRouter.get("/create", getFruitForm);

export { fruitRouter };
