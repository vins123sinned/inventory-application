import {
  getIdFromHarvest,
  getIdFromCategory,
  getHarvestFromId,
  getCategoryFromId,
} from "./db/queries.js";

const formatCheckbox = async (data, field) => {
  if (data === undefined) return null;
  if (!Array.isArray(data))
    return `{${field === "harvest" ? await getIdFromHarvest(data).id : await getIdFromCategory(data).id}}`;

  const idsArray = [];
  data.forEach(async (item) =>
    field === "harvest"
      ? idsArray.push(await getIdFromHarvest(item).id)
      : idsArray.push(await getIdFromCategory(item).id),
  );

  return idsArray.toString().replace(/\[/g, "{").replace(/\]/g, "}");
};

const convertToArray = async (oldArray, field) => {
  return await Promise.all(
    oldArray.map(async (id) =>
      field === "harvest"
        ? await getHarvestFromId(id)
        : await getCategoryFromId(id),
    ),
  );
};

export { formatCheckbox, convertToArray };
