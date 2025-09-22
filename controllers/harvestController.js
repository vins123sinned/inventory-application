import { getHarvest, getHarvestFromId } from "../db/queries.js";

const getHarvestPage = async (req, res) => {
  const { harvestId } = req.params;
  const harvest = await getHarvestFromId(harvestId);
  const fruits = await getHarvest(harvestId);
  res.render("layout", {
    title: `${harvest.name} Fruits`,
    path: "partials/list.ejs",
    fruits,
  });
};

const getHarvestForm = (req, res) => {
  res.send("Harvest form");
};

export { getHarvestPage, getHarvestForm };
