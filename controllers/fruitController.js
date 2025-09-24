import {
  getAllCategories,
  getAllFruits,
  getCategoryFromId,
  getFruit,
  getHarvestFromId,
  getAllHarvests,
} from "../db/queries.js";

const getFruitsPage = async (req, res) => {
  const fruits = await getAllFruits();
  res.render("layout", {
    title: "All Fruits",
    path: "partials/list.ejs",
    fruits,
  });
};

const getFruitPage = async (req, res) => {
  const { fruitId } = req.params;
  const fruit = await getFruit(fruitId);
  const category = await getCategoryFromId(fruit.category_id);
  const harvest = await getHarvestFromId(fruit.harvest_id);
  res.render("layout", {
    title: fruit.name,
    path: "partials/product.ejs",
    category,
    harvest,
    fruit,
  });
};

const getFruitForm = async (req, res) => {
  const categories = await getAllCategories();
  const harvests = await getAllHarvests();
  res.render("layout", {
    title: "Add a Fruit",
    path: "partials/fruitForm.ejs",
    categories,
    harvests,
  });
};

export { getFruitsPage, getFruitPage, getFruitForm };
