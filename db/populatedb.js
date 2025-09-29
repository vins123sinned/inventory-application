import { argv } from "node:process";
import { Client } from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS harvests (
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
  harvest_ids INTEGER ARRAY,
  category_ids INTEGER ARRAY
);

CREATE TABLE IF NOT EXISTS harvestFruit (
  harvest_id INT REFERENCES harvests(id),
  fruit_id INT REFERENCES fruits(id),
  PRIMARY KEY (harvest_id, fruit_id)
);

INSERT INTO harvests (name)
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

INSERT INTO fruits (name, description, price_per_pound, image_link, harvest_ids, category_ids) 
VALUES
  ('Honeycrisp Apple', 'A very delicious apple', 1.28, 'https://en.wikipedia.org/wiki/File:Honeycrisp-Apple.jpg', '{3}', '{1}'),
  ('Alice Mangoes', 'The Alice mango (Mangifera indica ‘Alice’) is a South Florida cultivar prized for its rich, sweet flavor and fiberless, aromatic flesh. Originating from a ‘Saigon’ seedling planted around 1935 by Fred Herman in South Miami and named after his wife Alice, the tree first fruited in 1940 and was officially recognized in 1950. Though admired for excellent eating quality, it never became a commercial staple because of light and inconsistent yields. The fruit is small to medium, typically under a pound, with smooth yellow-orange skin that may show a soft red blush, a rounded apex, and no beak. Inside, the deep orange flesh is juicy, fragrant, and entirely free of fiber, containing a monoembryonic seed. In Florida, Alice mangoes generally ripen from late June through July. The trees are vigorous and develop a spreading canopy, and preserved specimens are maintained in collections such as the USDA’s Miami station and the University of Florida’s Tropical Research and Education Center.', 1.83, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Mango_Alice_Asit_fs.jpg/2560px-Mango_Alice_Asit_fs.jpg', '{1}', '{1}');
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
