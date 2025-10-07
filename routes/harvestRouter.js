import { Router } from "express";
import {
  getDeleteHarvest,
  getEditHarvestForm,
  getHarvestForm,
  getHarvestPage,
  getHarvestsPage,
  postDeleteHarvest,
  postEditHarvestForm,
  postHarvestForm,
} from "../controllers/harvestController.js";

const harvestRouter = Router();

harvestRouter.get("/", getHarvestsPage);
harvestRouter.get("/create", getHarvestForm);
harvestRouter.post("/create", postHarvestForm);
harvestRouter.get("/edit/:harvestId", getEditHarvestForm);
harvestRouter.post("/edit/:harvestId", postEditHarvestForm);
harvestRouter.get("/delete/:harvestId", getDeleteHarvest);
harvestRouter.post("/delete/:harvestId", postDeleteHarvest);
harvestRouter.get("/:harvestId", getHarvestPage);

export { harvestRouter };
