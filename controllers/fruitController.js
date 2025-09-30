import { body, validationResult } from "express-validator";
import {
  getAllCategories,
  getAllFruits,
  getFruit,
  getAllHarvests,
  insertFruit,
} from "../db/queries.js";
import {
  convertToArray,
  formatCheckbox,
  lengthError,
  priceErr,
  requiredErr,
} from "../utils.js";

const validateFruit = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(`Name ${requiredErr}`)
    .bail()
    .isLength({ min: 1, max: 255 })
    .withMessage(`Name ${lengthError(255)}`),
  body("price")
    .trim()
    .notEmpty()
    .withMessage(`Price ${requiredErr}`)
    .bail()
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
  const list = await getAllFruits();
  res.render("layout", {
    title: "All Fruits",
    path: "partials/list.ejs",
    link: "/fruits/",
    addText: "Add a fruit",
    list,
  });
};

const getFruitPage = async (req, res) => {
  const { fruitId } = req.params;
  const fruit = await getFruit(fruitId);
  const categories = await convertToArray(fruit.category_ids, "category");
  const harvests = await convertToArray(fruit.harvest_ids, "harvest");
  res.render("layout", {
    title: fruit.name,
    path: "partials/product.ejs",
    categories,
    harvests,
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
    await insertFruit(
      name,
      price,
      image_link,
      formatCheckbox(harvest, "harvest"),
      formatCheckbox(category, "category"),
      description,
    );
    res.redirect("/fruits");
  },
];

export { getFruitsPage, getFruitPage, getFruitForm, postFruitForm };
