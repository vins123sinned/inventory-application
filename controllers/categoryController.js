const getAllCategories = (req, res) => {
  res.send("All categories");
};

const getCategoryPage = (req, res) => {
  res.send("Produce page");
};

const getCategoryForm = (req, res) => {
  res.send("Category form");
};

export { getAllCategories, getCategoryPage, getCategoryForm };
