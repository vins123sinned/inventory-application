import { argv } from "node:process";
import { Client } from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS harvests (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  name VARCHAR ( 255 ) NOT NULL,
  image_link VARCHAR ( 1000 )
);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL,
  image_link VARCHAR ( 1000 )
);

CREATE TABLE IF NOT EXISTS fruits (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL,
  description VARCHAR ( 1000 ) NOT NULL,
  price_per_pound NUMERIC ( 6, 2 ) NOT NULL,
  image_link VARCHAR ( 1000 ),
  harvest_ids INTEGER ARRAY,
  category_ids INTEGER ARRAY
);

CREATE TABLE IF NOT EXISTS harvestFruit (
  harvest_id INT REFERENCES harvests(id),
  fruit_id INT REFERENCES fruits(id),
  PRIMARY KEY (harvest_id, fruit_id)
);

INSERT INTO harvests (name, image_link)
VALUES
  ('Spring', 'https://upload.wikimedia.org/wikipedia/commons/f/fb/XN_Fruehjahrswiese_00.jpg'),
  ('Summer', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/20190212_SKJ0426-HDR-2.jpg/1599px-20190212_SKJ0426-HDR-2.jpg?20190303053427'),
  ('Autumn', 'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg'),
  ('Winter', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/CathedralofLearningLawinWinter.jpg/1600px-CathedralofLearningLawinWinter.jpg?20090425221911');

INSERT INTO categories (name, image_link)
VALUES
  ('Apples', 'https://images.unsplash.com/photo-1610397962076-02407a169a5b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974'),
  ('Bananas', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'),
  ('Mangos', 'https://images.unsplash.com/photo-1519096845289-95806ee03a1a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070');

INSERT INTO fruits (name, description, price_per_pound, image_link, harvest_ids, category_ids) 
VALUES
  ('Honeycrisp Apple', 'Honeycrisp apples are juicy, sweet-tart apples known for their crisp, refreshing crunch. Their perfectly balanced flavor and bright red-yellow skin make them a favorite for snacking, salads, and baking.', 1.28, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Honeycrisp-Apple.jpg/640px-Honeycrisp-Apple.jpg', '{2, 3}', '{1}'),
  ('Alice Mango', 'The Alice mango (Mangifera indica ‘Alice’) is a South Florida cultivar prized for its rich, sweet flavor and fiberless, aromatic flesh. Originating from a ‘Saigon’ seedling planted around 1935 by Fred Herman in South Miami and named after his wife Alice, the tree first fruited in 1940 and was officially recognized in 1950. Though admired for excellent eating quality, it never became a commercial staple because of light and inconsistent yields. The fruit is small to medium, typically under a pound, with smooth yellow-orange skin that may show a soft red blush, a rounded apex, and no beak. Inside, the deep orange flesh is juicy, fragrant, and entirely free of fiber, containing a monoembryonic seed. In Florida, Alice mangoes generally ripen from late June through July. The trees are vigorous and develop a spreading canopy, and preserved specimens are maintained in collections such as the USDA’s Miami station and the University of Florida’s Tropical Research and Education Center.', 1.83, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Mango_Alice_Asit_fs.jpg/2560px-Mango_Alice_Asit_fs.jpg', '{2, 3}', '{3}'),
  ('Pink Lady Apple', 'Pink Lady apples, also known as Cripps Pink, are prized for their vibrant pink-red skin, crisp texture, and balanced sweet-tart flavor. Their firm, juicy flesh makes them perfect for snacking, baking, or adding a refreshing crunch to salads. Grown in warm climates, Pink Lady apples develop a unique tangy-sweet taste that deepens as they ripen, offering a delightful blend of flavor and aroma that appeals to both casual snackers and apple connoisseurs alike.', 0.99, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Pink_Lady_Apple_%284107712628%29.jpg/1200px-Pink_Lady_Apple_%284107712628%29.jpg?20220909024221', '{2, 3}', '{1}'),
  ('Cosmic Crisp Apple', 'Cosmic Crisp apples are a modern variety celebrated for their perfect balance of sweetness and tartness, paired with an exceptionally crisp, juicy bite. Their deep red skin, speckled with tiny star-like dots, gives them a cosmic appearance. Developed in Washington State, these apples are slow to brown, store exceptionally well, and stay firm and flavorful for months. Ideal for snacking, baking, or salads, Cosmic Crisp apples deliver a refreshing, long-lasting crunch in every bite.', 1.00, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Cosmic_Crisp.jpg/1280px-Cosmic_Crisp.jpg', '{2, 3}', '{1}'),
  ('Honey Mango', 'Honey mangos, also known as Ataulfo or Champagne mangos, are small, golden-yellow fruits prized for their velvety texture and rich, creamy sweetness. Their smooth, fiberless flesh melts in your mouth, offering a tropical flavor with notes of honey, peach, and citrus. Unlike larger mango varieties, Honey mangos have a thin seed and higher fruit-to-pit ratio, making them perfect for snacking, smoothies, or desserts. As they ripen, their skin deepens to a rich gold and slightly wrinkles, signaling peak sweetness. Popular for their luscious flavor and versatility, Honey mangos are often enjoyed chilled, sliced fresh, or blended into sauces and drinks. Their naturally low acidity and buttery texture make them a tropical treat loved worldwide.', 0.79, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Yay%2C_the_Ataulfos_Have_Arrived.jpg/1599px-Yay%2C_the_Ataulfos_Have_Arrived.jpg?20201029185517', '{1}', '{3}'),
  ('Gros Michel Banana', 'Gros Michel bananas, once the world’s leading banana variety, are known for their rich, creamy texture and intense, sweet flavor. Larger and more robust than the modern Cavendish, they have a thicker peel and a classic “banana candy” taste. Though nearly wiped out by disease in the mid-20th century, Gros Michel bananas remain prized for their nostalgic flavor and exceptional quality where they’re still grown.', 3.40, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Pisang_Ambon_%28Gros_Michel%29_at_a_fruit_shop_in_Simpang_III_Sipin_-_Jambi_City%2C_JA.jpg/640px-Pisang_Ambon_%28Gros_Michel%29_at_a_fruit_shop_in_Simpang_III_Sipin_-_Jambi_City%2C_JA.jpg', '{2}', '{2}');
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
