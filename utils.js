import { getIdFromHarvest, getIdFromCategory } from "./db/queries.js";

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

  console.log(idsArray);
  return idsArray.toString().replace(/\[/g, "{").replace(/\]/g, "}");
};

export { formatCheckbox };
