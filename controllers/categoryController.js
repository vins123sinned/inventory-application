import { body, validationResult } from "express-validator";
import {
  getAllCategories,
  getCategory,
  getCategoryFromId,
  insertCategory,
} from "../db/queries.js";
import { requiredErr, lengthError } from "../utils.js";

const validateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(`Name ${requiredErr}`)
    .bail()
    .isLength({ min: 1, max: 255 })
    .withMessage(`Name ${lengthError(255)}`),
  body("image_link")
    .trim()
    .optional({ values: "falsy" })
    .isLength({ min: 1, max: 1000 })
    .withMessage(`Image link ${lengthError(1000)}`),
];

const getCategoriesPage = async (req, res) => {
  const list = await getAllCategories();
  res.render("layout", {
    title: "All categories",
    path: "partials/list.ejs",
    link: "/categories/",
    addText: "Add a category",
    list,
  });
};

const getCategoryPage = async (req, res) => {
  const { categoryId } = req.params;
  const category = await getCategoryFromId(categoryId);
  const fruits = await getCategory(categoryId);
  res.render("layout", {
    title: category.name,
    path: "partials/list.ejs",
    category,
    fruits,
  });
};

const getCategoryForm = (req, res) => {
  res.render("layout", {
    title: "Add a category",
    path: "partials/categoryForm.ejs",
    previousValues: undefined,
  });
};

const postCategoryForm = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("layout", {
        title: "Add a category",
        path: "partials/categoryForm.ejs",
        errors: errors.array(),
        previousValues: req.body,
      });
    }

    const { name, image_link } = req.body;
    await insertCategory(name, image_link);
    res.redirect("/categories");
  },
];

export {
  getCategoriesPage,
  getCategoryPage,
  getCategoryForm,
  postCategoryForm,
};
