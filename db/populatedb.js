import { argv } from "node:process";
import { Client } from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS species (
  id SERIAL PRIMARY KEY,
  name VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS harvest (
  id SERIAL PRIMARY KEY, 
  name VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS category (
  id SERIAL PRIMARY KEY,
  name VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS produce (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL,
  description VARCHAR ( 1000 ) NOT NULL,
  image_link VARCHAR ( 255 ),
  species_id INTEGER REFERENCES species(id),
  harvest_id INTEGER REFERENCES harvest(id),
  category_id INTEGER REFERENCES category(id)
);

CREATE TABLE IF NOT EXISTS harvestProduce (
  harvest_id INT REFERENCES harvest(id),
  produce_id INT REFERENCES produce(id),
  PRIMARY KEY (harvest_id, produce_id)
);

INSERT INTO species (name)
VALUES 
  ('Malus domestica'),
  ('Malus pumila'),
  ('Mangifera Alice');

INSERT INTO harvest (name)
VALUES
  ('Spring'),
  ('Summer'),
  ('Autumn'),
  ('Winter');

INSERT INTO category (name)
VALUES
  ('Fruits'),
  ('Vegetables'),
  ('Nuts');

INSERT INTO produce (name, description, image_link, species_id, harvest_id, category_id) 
VALUES
  ('Honeycrisp Apple', 'A very delicious apple', 'https://en.wikipedia.org/wiki/File:Honeycrisp-Apple.jpg', 2, 3, 1),
  ('Alice Mangoes', 'A Floridian mango cultivar', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Mango_Alice_Asit_fs.jpg/2560px-Mango_Alice_Asit_fs.jpg', 3, 1, 1);
`;

const main = async () => {
  console.log("seeding...");
  const client = new Client({
    connectionString: argv[2],
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
};

main();
