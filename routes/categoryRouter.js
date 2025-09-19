import { Router } from "express";
import {
  getCategoriesPage,
  getCategoryForm,
  getCategoryPage,
} from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/", getCategoriesPage);
categoryRouter.get("/:categoryId", getCategoryPage);
categoryRouter.get("/create", getCategoryForm);

export { categoryRouter };
