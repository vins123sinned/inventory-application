import { pool } from "./pool.js";

const getAllCategories = async () => {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
};

const getCategory = async (categoryId) => {
  const { rows } = await pool.query(
    "SELECT * FROM fruits WHERE $1 = ANY(category_ids)",
    [categoryId],
  );
  return rows;
};

const insertCategory = async (name, imageLink) => {
  await pool.query(
    "INSERT INTO categories (name, image_link) VALUES ($1, $2)",
    [name, imageLink],
  );
};

const updateCategory = async (name, imageLink, categoryId) => {
  await pool.query(
    "UPDATE categories SET name = $1, image_link = $2 WHERE id = $3",
    [name, imageLink, categoryId],
  );
};

const deleteCategory = async (categoryId) => {
  await pool.query(
    "UPDATE fruits SET category_ids = ARRAY_REMOVE(category_ids, $1) WHERE $1 = ANY(category_ids)",
    [categoryId],
  );
  await pool.query("DELETE FROM categories WHERE id = $1", [categoryId]);
};

const getCategoryFromId = async (categoryId) => {
  const { rows } = await pool.query(
    "SELECT * FROM categories WHERE id = $1 LIMIT 1",
    [categoryId],
  );
  return rows[0];
};

const getCategoryFromName = async (category) => {
  const { rows } = await pool.query(
    "SELECT * FROM categories WHERE name = $1 LIMIT 1",
    [category],
  );
  return rows[0];
};

const getAllFruits = async () => {
  const { rows } = await pool.query("SELECT * FROM fruits");
  return rows;
};

const getFruit = async (fruitId) => {
  const { rows } = await pool.query(
    "SELECT * FROM fruits WHERE id = $1 LIMIT 1",
    [fruitId],
  );
  return rows[0];
};

const insertFruit = async (
  fruitName,
  pricePerPound,
  imageLink,
  harvestIds,
  categoryIds,
  description,
) => {
  await pool.query(
    "INSERT INTO fruits (name, description, price_per_pound, image_link, harvest_ids, category_ids) VALUES ($1, $2, $3, $4, $5, $6)",
    [fruitName, description, pricePerPound, imageLink, harvestIds, categoryIds],
  );
};

const updateFruit = async (
  fruitName,
  pricePerPound,
  imageLink,
  harvestIds,
  categoryIds,
  description,
  fruitId,
) => {
  await pool.query(
    "UPDATE fruits SET name = $1, description = $2, price_per_pound = $3, image_link = $4, harvest_ids = $5, category_ids = $6 WHERE id = $7",
    [
      fruitName,
      description,
      pricePerPound,
      imageLink,
      harvestIds,
      categoryIds,
      fruitId,
    ],
  );
};

const deleteFruit = async (fruitId) => {
  await pool.query("DELETE FROM fruits WHERE id = $1", [fruitId]);
};

const getAllHarvests = async () => {
  const { rows } = await pool.query("SELECT * FROM harvests");
  return rows;
};

const getHarvests = async (harvestId) => {
  const { rows } = await pool.query(
    "SELECT * FROM fruits WHERE $1 = ANY (harvest_ids)",
    [harvestId],
  );
  return rows;
};

const insertHarvest = async (name, imageLink) => {
  await pool.query("INSERT INTO harvests (name, image_link) VALUES ($1, $2)", [
    name,
    imageLink,
  ]);
};

const updateHarvest = async (name, imageLink, harvestId) => {
  await pool.query(
    "UPDATE harvests SET name = $1, image_link = $2 WHERE id = $3",
    [name, imageLink, harvestId],
  );
};

const deleteHarvest = async (harvestId) => {
  await pool.query(
    "UPDATE fruits SET harvest_ids = ARRAY_REMOVE(harvest_ids, $1) WHERE $1 = ANY(harvest_ids)",
    [harvestId],
  );
  await pool.query("DELETE FROM harvests WHERE id = $1", [harvestId]);
};

const getHarvestFromId = async (harvestId) => {
  const { rows } = await pool.query(
    "SELECT * FROM harvests WHERE id = $1 LIMIT 1",
    [harvestId],
  );
  return rows[0];
};

const getHarvestFromName = async (harvest) => {
  const { rows } = await pool.query(
    "SELECT * FROM harvests where name = $1 LIMIT 1",
    [harvest],
  );
  return rows[0];
};

export {
  getAllCategories,
  getCategory,
  getCategoryFromId,
  getCategoryFromName,
  insertCategory,
  updateCategory,
  deleteCategory,
  getAllFruits,
  getFruit,
  insertFruit,
  updateFruit,
  deleteFruit,
  getAllHarvests,
  getHarvests,
  getHarvestFromId,
  getHarvestFromName,
  insertHarvest,
  updateHarvest,
  deleteHarvest,
};
