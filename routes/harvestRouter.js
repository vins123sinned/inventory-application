import { Router } from "express";
import {
  getHarvestForm,
  getHarvestPage,
  getHarvestsPage,
  postHarvestForm,
} from "../controllers/harvestController.js";

const harvestRouter = Router();

harvestRouter.get("/", getHarvestsPage);
harvestRouter.get("/create", getHarvestForm);
harvestRouter.post("/create", postHarvestForm);
harvestRouter.get("/:harvestId", getHarvestPage);

export { harvestRouter };
