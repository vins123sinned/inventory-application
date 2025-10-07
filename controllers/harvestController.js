import { body, validationResult } from "express-validator";
import {
  getHarvests,
  getHarvestFromId,
  getAllHarvests,
  insertHarvest,
  updateHarvest,
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
    title: "All harvests",
    path: "partials/list.ejs",
    link: "/harvests/",
    addText: "Add a harvest",
    list,
  });
};

const getHarvestPage = async (req, res) => {
  const { harvestId } = req.params;
  const harvest = await getHarvestFromId(harvestId);
  const list = await getHarvests(harvestId);
  res.render("layout", {
    title: `${harvest.name} Fruits`,
    path: "partials/list.ejs",
    link: "/fruits/",
    addText: "Add a harvest",
    list,
  });
};

const getHarvestForm = (req, res) => {
  res.render("layout", {
    title: "Add a harvest",
    path: "partials/listForm.ejs",
    link: "/harvests/",
    previousValues: undefined,
  });
};

const getEditHarvestForm = async (req, res) => {
  const { harvestId } = req.params;
  const harvest = await getHarvestFromId(harvestId);
  console.log(harvest);
  res.render("layout", {
    title: "Add a harvest",
    path: "partials/listForm.ejs",
    link: "/harvests/",
    previousValues: harvest,
  });
};

const postHarvestForm = [
  validateHarvest,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("layout", {
        title: "Add a harvest",
        path: "partials/listForm.ejs",
        link: "/harvests/",
        errors: errors.array(),
        previousValues: req.body,
      });
    }

    const { name, image_link } = req.body;
    await insertHarvest(name, image_link);
    res.redirect("/harvests");
  },
];

const postEditHarvestForm = [
  validateHarvest,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("layout", {
        title: "Add a harvest",
        path: "partials/listForm.ejs",
        link: "/harvests/",
        errors: errors.array(),
        previousValues: req.body,
      });
    }

    const { harvestId } = req.params;
    const { name, image_link } = req.body;
    await updateHarvest(name, image_link, harvestId);
    res.redirect("/harvests");
  },
];

export {
  getHarvestsPage,
  getHarvestPage,
  getHarvestForm,
  getEditHarvestForm,
  postHarvestForm,
  postEditHarvestForm,
};
