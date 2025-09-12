const getHomepage = (req, res) => {
  res.render("layout");
};

const getAboutPage = (req, res) => {
  res.send("layout");
};

export { getHomepage, getAboutPage };
