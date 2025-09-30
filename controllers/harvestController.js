import { body, validationResult } from "express-validator";
import {
  getHarvests,
  getHarvestFromId,
  getAllHarvests,
  insertHarvest,
} from "../db/queries.js";
import { requiredErr, lengthError } from "../utils.js";

const validateHarvest = [
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

const getHarvestsPage = async (req, res) => {
  const list = await getAllHarvests();
  res.render("layout", {
    title: "All categories",
    path: "partials/list.ejs",
    link: "/harvests/",
    addText: "Add a harvest",
    list,
  });
};

const getHarvestPage = async (req, res) => {
  const { harvestId } = req.params;
  const harvest = await getHarvestFromId(harvestId);
  const fruits = await getHarvests(harvestId);
  res.render("layout", {
    title: `${harvest.name} Fruits`,
    path: "partials/list.ejs",
    fruits,
  });
};

const getHarvestForm = (req, res) => {
  res.render("layout", {
    title: "Add a category",
    path: "partials/harvestForm.ejs",
    previousValues: undefined,
  });
};

const postHarvestForm = [
  validateHarvest,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("layout", {
        title: "Add a category",
        path: "partials/categoryForm.ejs",
        errors: errors.array(),
        previousValues: req.body,
      });
    }

    const { name, image_link } = req.body;
    await insertHarvest(name, image_link);
    res.redirect("/harvests");
  },
];

export { getHarvestsPage, getHarvestPage, getHarvestForm, postHarvestForm };
