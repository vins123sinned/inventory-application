const getHomepage = (req, res) => {
  res.render("layout", {
    title: "Fruitta",
    path: "partials/homepage.ejs",
  });
};

const getAttributionPage = (req, res) => {
  res.render("layout", {
    title: "Attributions",
    path: "partials/attributions.ejs",
  });
};

export { getHomepage, getAttributionPage };
