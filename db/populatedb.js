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
  ('Summer', 'https://miro.medium.com/v2/resize:fit:1400/0*1DtL639ZXJQj8ZDA.jpg'),
  ('Autumn', 'https://cdn.britannica.com/18/196818-050-7030C41D/Maple-Colors.jpg'),
  ('Winter', 'https://clv.h-cdn.co/assets/17/51/2560x1920/gallery-1513617783-pigoff-photography-195118.jpg');

INSERT INTO categories (name, image_link)
VALUES
  ('Apples', 'https://hips.hearstapps.com/hmg-prod/images/apples-at-farmers-market-royalty-free-image-1627321463.jpg?crop=0.796xw:1.00xh;0.103xw,0&resize=640:*'),
  ('Bananas', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'),
  ('Mangos', 'https://ichef.bbci.co.uk/images/ic/1920x1080/p06hk0h6.jpg');

INSERT INTO fruits (name, description, price_per_pound, image_link, harvest_ids, category_ids) 
VALUES
  ('Honeycrisp Apple', 'Honeycrisp apples are juicy, sweet-tart apples known for their crisp, refreshing crunch. Their perfectly balanced flavor and bright red-yellow skin make them a favorite for snacking, salads, and baking.', 1.28, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Honeycrisp-Apple.jpg/1200px-Honeycrisp-Apple.jpg', '{2, 3}', '{1}'),
  ('Alice Mango', 'The Alice mango (Mangifera indica ‘Alice’) is a South Florida cultivar prized for its rich, sweet flavor and fiberless, aromatic flesh. Originating from a ‘Saigon’ seedling planted around 1935 by Fred Herman in South Miami and named after his wife Alice, the tree first fruited in 1940 and was officially recognized in 1950. Though admired for excellent eating quality, it never became a commercial staple because of light and inconsistent yields. The fruit is small to medium, typically under a pound, with smooth yellow-orange skin that may show a soft red blush, a rounded apex, and no beak. Inside, the deep orange flesh is juicy, fragrant, and entirely free of fiber, containing a monoembryonic seed. In Florida, Alice mangoes generally ripen from late June through July. The trees are vigorous and develop a spreading canopy, and preserved specimens are maintained in collections such as the USDA’s Miami station and the University of Florida’s Tropical Research and Education Center.', 1.83, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Mango_Alice_Asit_fs.jpg/2560px-Mango_Alice_Asit_fs.jpg', '{2, 3}', '{3}'),
  ('Pink Lady Apple', 'Pink Lady apples, also known as Cripps Pink, are prized for their vibrant pink-red skin, crisp texture, and balanced sweet-tart flavor. Their firm, juicy flesh makes them perfect for snacking, baking, or adding a refreshing crunch to salads. Grown in warm climates, Pink Lady apples develop a unique tangy-sweet taste that deepens as they ripen, offering a delightful blend of flavor and aroma that appeals to both casual snackers and apple connoisseurs alike.', 0.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7QEAU9rxu05tH3PjVDiG3J8UXisr4iOB7omj4ZvhSuFXx_ojSnI4K6DEuCB30poTvUz6sYYC8Xqj5Ye9gQ1PE4_DO-KXyaIlXKfTBtYA', '{2, 3}', '{1}'),
  ('Cosmic Crisp Apple', 'Cosmic Crisp apples are a modern variety celebrated for their perfect balance of sweetness and tartness, paired with an exceptionally crisp, juicy bite. Their deep red skin, speckled with tiny star-like dots, gives them a cosmic appearance. Developed in Washington State, these apples are slow to brown, store exceptionally well, and stay firm and flavorful for months. Ideal for snacking, baking, or salads, Cosmic Crisp apples deliver a refreshing, long-lasting crunch in every bite.', 1.00, 'https://applerankings.com/wp-content/uploads/2021/10/cosmic-crisp-apple.png', '{2, 3}', '{1}'),
  ('Honey Mango', 'Honey mangos, also known as Ataulfo or Champagne mangos, are small, golden-yellow fruits prized for their velvety texture and rich, creamy sweetness. Their smooth, fiberless flesh melts in your mouth, offering a tropical flavor with notes of honey, peach, and citrus. Unlike larger mango varieties, Honey mangos have a thin seed and higher fruit-to-pit ratio, making them perfect for snacking, smoothies, or desserts. As they ripen, their skin deepens to a rich gold and slightly wrinkles, signaling peak sweetness. Popular for their luscious flavor and versatility, Honey mangos are often enjoyed chilled, sliced fresh, or blended into sauces and drinks. Their naturally low acidity and buttery texture make them a tropical treat loved worldwide.', 0.79, 'https://www.melissas.com/cdn/shop/files/4-pounds-image-of-honey-mangos-fruit-1125637415_600x600.jpg?v=1738768090', '{1}', '{3}'),
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
