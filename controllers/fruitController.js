import { body, validationResult } from "express-validator";
import {
  getAllCategories,
  getAllFruits,
  getFruit,
  getAllHarvests,
  insertFruit,
  updateFruit,
} from "../db/queries.js";
import {
  convertIdToArray,
  convertReqToArray,
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
  body("price_per_pound")
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
  const categories = await convertIdToArray(fruit.category_ids, "category");
  const harvests = await convertIdToArray(fruit.harvest_ids, "harvest");
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

const getEditFruitForm = async (req, res) => {
  const { fruitId } = req.params;
  const fruit = await getFruit(fruitId);
  const categories = await getAllCategories();
  const harvests = await getAllHarvests();
  res.render("layout", {
    title: "Add a Fruit",
    path: "partials/fruitForm.ejs",
    categories,
    harvests,
    previousValues: {
      ...fruit,
      harvests_array: await convertIdToArray(fruit.harvest_ids, "harvest"),
      categories_array: await convertIdToArray(fruit.category_ids, "category"),
    },
  });
};

const postFruitForm = [
  validateFruit,
  async (req, res) => {
    const errors = validationResult(req);
    const categories = await getAllCategories();
    const harvests = await getAllHarvests();
    console.log(convertReqToArray(req.body.harvest));

    if (!errors.isEmpty()) {
      return res.status(400).render("layout", {
        title: "Add a fruit",
        path: "partials/fruitForm.ejs",
        categories,
        harvests,
        errors: errors.array(),
        previousValues: {
          ...req.body,
          // we have find, but this is includes
          harvests_array: convertReqToArray(req.body.harvest),
          categories_array: convertReqToArray(req.body.category),
        },
      });
    }

    const {
      name,
      price_per_pound,
      image_link,
      harvest,
      category,
      description,
    } = req.body;
    await insertFruit(
      name,
      price_per_pound,
      image_link,
      await formatCheckbox(harvest, "harvest"),
      await formatCheckbox(category, "category"),
      description,
    );
    res.redirect("/fruits");
  },
];

const postEditFruitForm = [
  validateFruit,
  async (req, res) => {
    const { fruitId } = req.params;
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
        previousValues: {
          ...req.body,
          harvests_array: convertReqToArray(req.body.harvest),
          categories_array: convertReqToArray(req.body.category),
        },
      });
    }

    const {
      name,
      price_per_pound,
      image_link,
      harvest,
      category,
      description,
    } = req.body;
    await updateFruit(
      name,
      price_per_pound,
      image_link,
      await formatCheckbox(harvest, "harvest"),
      await formatCheckbox(category, "category"),
      description,
      fruitId,
    );
    res.redirect("/fruits");
  },
];

export {
  getFruitsPage,
  getFruitPage,
  getFruitForm,
  getEditFruitForm,
  postFruitForm,
  postEditFruitForm,
};
