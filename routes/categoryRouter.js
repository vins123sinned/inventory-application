import { Router } from "express";
import {
  getCategoriesPage,
  getCategoryForm,
  getCategoryPage,
  getEditCategoryForm,
  postCategoryForm,
  postEditCategoryForm,
} from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/", getCategoriesPage);
categoryRouter.get("/create", getCategoryForm);
categoryRouter.post("/create", postCategoryForm);
categoryRouter.get("/edit/:categoryId", getEditCategoryForm);
categoryRouter.post("/edit/:categoryId", postEditCategoryForm);
categoryRouter.get("/:categoryId", getCategoryPage);

export { categoryRouter };
