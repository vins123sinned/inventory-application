import { Router } from "express";
import { getAboutPage, getHomepage } from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get("/", getHomepage);
indexRouter.get("/about", getAboutPage);

export { indexRouter };
