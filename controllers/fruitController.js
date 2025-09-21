import { getAllFruits } from "../db/queries.js";

const getFruitsPage = async (req, res) => {
  const fruits = await getAllFruits();
  res.render("layout", {
    title: "All Fruits",
    path: "partials/list.ejs",
    fruits,
  });
};

const getFruitPage = (req, res) => {
  res.send("Fruit");
};

const getFruitForm = (req, res) => {
  res.send("Fruit form");
};

export { getFruitsPage, getFruitPage, getFruitForm };
