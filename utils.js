import {
  getHarvestFromName,
  getCategoryFromName,
  getHarvestFromId,
  getCategoryFromId,
} from "./db/queries.js";

const requiredErr = "is required";
const lengthError = (maxLength) =>
  `must be between 1 and ${maxLength} characters`;
const priceErr = "must be a number up to 9999.99 with max 2 decimal places";

// format array of harvests (['spring', 'summer', ...]) to their respective foreign ids in SQL ([0, 1, ...])
const formatCheckbox = async (data, field) => {
  console.log("Data is array: " + Array.isArray(data) + ` (${data})`);
  if (!data) return null;
  if (!Array.isArray(data))
    return `{${field === "harvest" ? (await getHarvestFromName(data)).id : (await getCategoryFromName(data)).id}}`;

  const idsArray = await Promise.all(
    data.map(async (item) =>
      field === "harvest"
        ? (await getHarvestFromName(item)).id
        : (await getCategoryFromName(item)).id,
    ),
  );

  return `{${idsArray.join(",")}}`;
};

// Make array of ids ([0, 1, ...]) into an array of harvest instances for product.ejs
const convertIdToArray = async (oldArray, field) => {
  if (!Array.isArray(oldArray)) return [];

  return await Promise.all(
    oldArray.map(async (id) =>
      field === "harvest"
        ? await getHarvestFromId(id)
        : await getCategoryFromId(id),
    ),
  );
};

// make req.body's checkboxes an array if it isn't already
const convertReqToArray = (data) => {
  if (Array.isArray(data)) return data;
  if (!data) return [];

  return [data];
};

export {
  requiredErr,
  lengthError,
  priceErr,
  formatCheckbox,
  convertIdToArray,
  convertReqToArray,
};
