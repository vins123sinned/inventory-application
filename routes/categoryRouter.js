import { Router } from "express";
import {
  getAllCategories,
  getCategoryForm,
  getCategoryPage,
} from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:categoryId", getCategoryPage);
categoryRouter.get("/create", getCategoryForm);

export { categoryRouter };
