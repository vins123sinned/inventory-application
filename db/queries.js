import { pool } from "./pool.js";

const getAllCategories = async () => {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
};

const getCategory = async (categoryId) => {
  const { rows } = await pool.query(
    "SELECT * FROM fruits WHERE category_id = $1",
    [categoryId],
  );
  return rows;
};

const insertCategory = async (categoryName, imageLink) => {
  await pool.query(
    "INSERT INTO categories (name, image_link) VALUES ($1, $2)",
    [categoryName, imageLink],
  );
};

const getCategoryFromId = async (categoryId) => {
  const { rows } = await pool.query(
    "SELECT * FROM categories WHERE id = $1 LIMIT 1",
    [categoryId],
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
  description,
  pricePerPound,
  imageLink,
  harvestId,
  categoryId,
) => {
  // possibly enter an entry for the harvestProduce table when the time is right
  await pool.query(
    "INSERT INTO fruits (name, description, price_per_pound, image_link, species_id, harvest_id, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [fruitName, description, pricePerPound, imageLink, harvestId, categoryId],
  );
};

const getAllHarvests = async () => {
  const { rows } = await pool.query("SELECT * FROM harvests");
  return rows;
};

const getHarvests = async (harvestId) => {
  const { rows } = await pool.query(
    "SELECT * FROM fruits WHERE harvest_id = $1",
    [harvestId],
  );
  return rows;
};

const getHarvestFromId = async (harvestId) => {
  const { rows } = await pool.query(
    "SELECT * FROM harvests WHERE id = $1 LIMIT 1",
    [harvestId],
  );
  return rows[0];
};

export {
  getAllCategories,
  getCategory,
  getCategoryFromId,
  getAllFruits,
  getFruit,
  getAllHarvests,
  getHarvests,
  getHarvestFromId,
};
