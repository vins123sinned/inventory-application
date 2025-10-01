import { Router } from "express";
import {
  getEditHarvestForm,
  getHarvestForm,
  getHarvestPage,
  getHarvestsPage,
  postEditHarvestForm,
  postHarvestForm,
} from "../controllers/harvestController.js";

const harvestRouter = Router();

harvestRouter.get("/", getHarvestsPage);
harvestRouter.get("/create", getHarvestForm);
harvestRouter.post("/create", postHarvestForm);
harvestRouter.get("/edit/:harvestId", getEditHarvestForm);
harvestRouter.post("/edit/:harvestId", postEditHarvestForm);
harvestRouter.get("/:harvestId", getHarvestPage);

export { harvestRouter };
