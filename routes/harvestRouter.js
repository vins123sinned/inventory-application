import { Router } from "express";
import { getHarvestPage } from "../controllers/harvestController.js";

const harvestRouter = Router();

harvestRouter.get("/:harvestId", getHarvestPage);

export { harvestRouter };
