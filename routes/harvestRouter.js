import { Router } from "express";
import {
  getHarvestForm,
  getHarvestPage,
} from "../controllers/harvestController.js";

const harvestRouter = Router();

harvestRouter.get("/:harvestId", getHarvestPage);
harvestRouter.get("/create", getHarvestForm);

export { harvestRouter };
