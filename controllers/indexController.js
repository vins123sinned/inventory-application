const getHomepage = (req, res) => {
  res.send("Homepage");
};

const getAboutPage = (req, res) => {
  res.send("About");
};

export { getHomepage, getAboutPage };
