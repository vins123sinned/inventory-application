import { Router } from "express";
import { getAttributionPage, getHomepage } from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get("/", getHomepage);
indexRouter.get("/attributions", getAttributionPage);

export { indexRouter };
