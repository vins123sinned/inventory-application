const getHomepage = (req, res) => {
  res.render("layout", {
    title: "Fruitta",
    path: "partials/homepage.ejs",
  });
};

const getAboutPage = (req, res) => {
  res.send("layout");
};

export { getHomepage, getAboutPage };
