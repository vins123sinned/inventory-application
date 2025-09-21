import {
  getAllCategories,
  getCategory,
  getCategoryFromId,
} from "../db/queries.js";

const getCategoriesPage = async (req, res) => {
  const categories = await getAllCategories();
  res.render("layout", {
    title: "All categories",
    path: "partials/list.ejs",
    categories,
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
  res.send("Category form");
};

export { getCategoriesPage, getCategoryPage, getCategoryForm };
