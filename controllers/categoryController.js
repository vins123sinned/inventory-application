import { body, validationResult } from "express-validator";
import {
  deleteCategory,
  getAllCategories,
  getCategory,
  getCategoryFromId,
  insertCategory,
  updateCategory,
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
  const list = await getCategory(categoryId);
  res.render("layout", {
    title: category.name,
    path: "partials/list.ejs",
    link: "/fruits/",
    addText: "Add a fruit",
    query: `?route=categories&id=${category.id}`,
    list,
  });
};

const getCategoryForm = (req, res) => {
  res.render("layout", {
    title: "Add a category",
    path: "partials/listForm.ejs",
    link: "/categories/",
    submitText: "Add",
    previousValues: undefined,
  });
};

const getEditCategoryForm = async (req, res) => {
  const { categoryId } = req.params;
  const category = await getCategoryFromId(categoryId);
  res.render("layout", {
    title: "Update category",
    path: "partials/listForm.ejs",
    link: "/categories/",
    submitText: "Update",
    previousValues: category,
  });
};

const postCategoryForm = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("layout", {
        title: "Add a category",
        path: "partials/listForm.ejs",
        link: "/categories/",
        submitText: "Add",
        errors: errors.array(),
        previousValues: req.body,
      });
    }

    const { name, image_link } = req.body;
    await insertCategory(name, image_link);
    res.redirect("/categories");
  },
];

const postEditCategoryForm = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("layout", {
        title: "Update category",
        path: "partials/listForm.ejs",
        link: "/categories/",
        submitText: "Update",
        errors: errors.array(),
        previousValues: req.body,
      });
    }

    const { categoryId } = req.params;
    const { name, image_link } = req.body;
    await updateCategory(name, image_link, categoryId);
    res.redirect("/categories");
  },
];

const getDeleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  const list = await getAllCategories();
  res.render("layout", {
    title: "All categories",
    path: "partials/list.ejs",
    link: "/categories/",
    addText: "Add a category",
    deleteLink: `/categories/delete/${categoryId}`,
    list,
  });
};

const postDeleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  await deleteCategory(categoryId);
  res.redirect("/categories/");
};

export {
  getCategoriesPage,
  getCategoryPage,
  getCategoryForm,
  getEditCategoryForm,
  postCategoryForm,
  postEditCategoryForm,
  getDeleteCategory,
  postDeleteCategory,
};
