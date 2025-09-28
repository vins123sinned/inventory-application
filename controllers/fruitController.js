import { body, validationResult } from "express-validator";
import {
  getAllCategories,
  getAllFruits,
  getCategoryFromId,
  getFruit,
  getHarvestFromId,
  getAllHarvests,
  insertFruit,
} from "../db/queries.js";

//trim whitespace too!
const requiredErr = "is required";
const lengthError = (maxLength) =>
  `must be between 1 and ${maxLength} characters`;
const priceErr = "must be a number up to 9999.99 with max 2 decimal places";

const validateFruit = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(`Name ${requiredErr}`)
    .isLength({ min: 1, max: 255 })
    .withMessage(`Name ${lengthError(255)}`),
  body("price")
    .trim()
    .notEmpty()
    .withMessage(`Price ${requiredErr}`)
    .matches(/^(\d{1,4}(\.\d{1,2})?|\.\d{1,2})$/)
    .withMessage(`Price ${priceErr}`),
  body("image_link")
    .trim()
    .optional({ values: "falsy" })
    .isLength({ min: 1, max: 1000 })
    .withMessage(`Image link ${lengthError(1000)}`),
  body("description")
    .trim()
    .optional({ values: "falsy" })
    .isLength({ min: 1, max: 1000 })
    .withMessage(`Description ${lengthError(1000)}`),
];

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
    previousValues: undefined,
  });
};

const postFruitForm = [
  validateFruit,
  async (req, res) => {
    const errors = validationResult(req);
    const categories = await getAllCategories();
    const harvests = await getAllHarvests();

    if (!errors.isEmpty()) {
      return res.status(400).render("layout", {
        title: "Add a fruit",
        path: "partials/fruitForm.ejs",
        categories,
        harvests,
        errors: errors.array(),
        previousValues: req.body,
      });
    }

    const { name, price, image_link, harvest, category, description } =
      req.body;
    await insertFruit(name, price, image_link, harvest, category, description);
    res.redirect("/fruits");
  },
];

export { getFruitsPage, getFruitPage, getFruitForm, postFruitForm };
