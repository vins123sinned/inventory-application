import { Router } from "express";
import {
  getCategoriesPage,
  getCategoryForm,
  getCategoryPage,
} from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/", getCategoriesPage);
categoryRouter.get("/create", getCategoryForm);
categoryRouter.get("/:categoryId", getCategoryPage);

export { categoryRouter };
