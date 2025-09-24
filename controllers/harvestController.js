import { getHarvests, getHarvestFromId } from "../db/queries.js";

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

export { getHarvestPage };
