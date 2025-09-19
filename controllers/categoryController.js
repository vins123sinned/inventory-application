import { getAllCategories } from "../db/queries.js";

const getCategoriesPage = async (req, res) => {
  const categories = await getAllCategories();
  // finish this then commit
  res.render("layout", {
    title: "All categories",
    path: "partials/categories.ejs",
    categories,
  });
};

const getCategoryPage = (req, res) => {
  res.send("Produce page");
};

const getCategoryForm = (req, res) => {
  res.send("Category form");
};

export { getCategoriesPage, getCategoryPage, getCategoryForm };
