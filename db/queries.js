import { pool } from "./pool.js";

const getAllCategories = async () => {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
};

const getCategory = async (categoryId) => {
  const { rows } = await pool.query(
    "SELECT * FROM categories WHERE id = $1 LIMIT 1",
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

const getAllProduce = async () => {
  const { rows } = await pool.query("SELECT * FROM produce");
  return rows;
};

const getProduce = async (produceId) => {
  const { rows } = await pool.query(
    "SELECT * FROM produce WHERE id = $1 LIMIT 1",
    [produceId],
  );
  return rows;
};

const insertProduce = async (
  produceName,
  description,
  pricePerPound,
  imageLink,
  speciesId,
  harvestId,
  categoryId,
) => {
  // possibly enter an entry for the harvestProduce table when the time is right
  await pool.query(
    "INSERT INTO produce (name, description, price_per_pound, image_link, species_id, harvest_id, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [
      produceName,
      description,
      pricePerPound,
      imageLink,
      speciesId,
      harvestId,
      categoryId,
    ],
  );
};

export { getAllCategories };
