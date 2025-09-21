const getAllProduce = async (req, res) => {
  const produce = await getAllProduce();
  res.render("layout", {
    title: "All Produce",
    path: "partials/layout.ejs",
    produce,
  });
};

const getProducePage = (req, res) => {
  res.send("Produce");
};

const getProduceForm = (req, res) => {
  res.send("Produce form");
};

export { getAllProduce, getProducePage, getProduceForm };
