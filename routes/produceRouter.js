import { Router } from "express";
import {
  getAllProduce,
  getProduceForm,
  getProducePage,
} from "../controllers/produceController.js";

const produceRouter = Router();

produceRouter.get("/", getAllProduce);
produceRouter.get("/:produceId", getProducePage);
produceRouter.get("/create", getProduceForm);

export { produceRouter };
