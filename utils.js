import {
  getIdFromHarvest,
  getIdFromCategory,
  getHarvestFromId,
  getCategoryFromId,
} from "./db/queries.js";

const requiredErr = "is required";
const lengthError = (maxLength) =>
  `must be between 1 and ${maxLength} characters`;
const priceErr = "must be a number up to 9999.99 with max 2 decimal places";

// format array of harvests (['spring', 'summer', ...]) to their respective foreign ids in SQL ([0, 1, ...])
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

// Make array of ids ([0, 1, ...]) into an array of harvests (['spring', 'summer', ...])
const convertToArray = async (oldArray, field) => {
  return await Promise.all(
    oldArray.map(async (id) =>
      field === "harvest"
        ? await getHarvestFromId(id)
        : await getCategoryFromId(id),
    ),
  );
};

export { requiredErr, lengthError, priceErr, formatCheckbox, convertToArray };
