const getAuthentication = (req, res) => {
  res.render("layout", {
    title: "Enter Password",
    path: "partials/authentication.ejs",
  });
};

export { getAuthentication };
