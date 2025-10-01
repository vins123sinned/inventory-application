import { pool } from "./pool.js";

const getAllCategories = async () => {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
};

const getCategory = async (categoryId) => {
  const { rows } = await pool.query(
    "SELECT * FROM fruits WHERE $1 = ANY (category_ids)",
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

const getCategoryFromId = async (categoryId) => {
  const { rows } = await pool.query(
    "SELECT * FROM categories WHERE id = $1 LIMIT 1",
    [categoryId],
  );
  return rows[0];
};

const getIdFromCategory = async (category) => {
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

const getHarvestFromId = async (harvestId) => {
  const { rows } = await pool.query(
    "SELECT * FROM harvests WHERE id = $1 LIMIT 1",
    [harvestId],
  );
  return rows[0];
};

const getIdFromHarvest = async (harvest) => {
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
  getIdFromCategory,
  insertCategory,
  updateCategory,
  getAllFruits,
  getFruit,
  insertFruit,
  getAllHarvests,
  getHarvests,
  getHarvestFromId,
  getIdFromHarvest,
  insertHarvest,
  updateHarvest,
};
