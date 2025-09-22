import { getAllFruits, getCategoryFromId, getFruit } from "../db/queries.js";

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
  res.render("layout", {
    title: fruit.name,
    path: "partials/product.ejs",
    category,
    fruit,
  });
};

const getFruitForm = (req, res) => {
  res.send("Fruit form");
};

export { getFruitsPage, getFruitPage, getFruitForm };
