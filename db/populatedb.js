import { argv } from "node:process";
import { Client } from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS harvest (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  name VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL,
  image_link VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS fruits (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL,
  description VARCHAR ( 1000 ) NOT NULL,
  price_per_pound NUMERIC ( 6, 2 ) NOT NULL,
  image_link VARCHAR ( 255 ),
  harvest_id INTEGER REFERENCES harvest(id),
  category_id INTEGER REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS harvestFruit (
  harvest_id INT REFERENCES harvest(id),
  fruit_id INT REFERENCES fruits(id),
  PRIMARY KEY (harvest_id, fruit_id)
);

INSERT INTO harvest (name)
VALUES
  ('Spring'),
  ('Summer'),
  ('Autumn'),
  ('Winter');

INSERT INTO categories (name, image_link)
VALUES
  ('Fruits', 'https://www.health.com/thmb/KiyIE7lJinlFp8ppAnaAKxlcHv8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/HealthiestFruits-feb2318dc0a3454993007f57c724753f.jpg'),
  ('Vegetables', 'https://images2.minutemediacdn.com/image/upload/c_crop,x_0,y_0,w_1097,h_617/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/643188-gettyimages-153946385-ca1ccfaad9be44325afc434b305adc0d.jpg'),
  ('Nuts', 'https://www.finedininglovers.com/sites/default/files/article_content_images/Nuts.jpg');

INSERT INTO fruits (name, description, price_per_pound, image_link, harvest_id, category_id) 
VALUES
  ('Honeycrisp Apple', 'A very delicious apple', 1.28, 'https://en.wikipedia.org/wiki/File:Honeycrisp-Apple.jpg', 3, 1),
  ('Alice Mangoes', 'A Floridian mango cultivar', 1.83, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Mango_Alice_Asit_fs.jpg/2560px-Mango_Alice_Asit_fs.jpg', 1, 1);
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
