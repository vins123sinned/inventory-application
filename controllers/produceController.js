const getAllProduce = (req, res) => {
  res.send("All produce");
};

const getProducePage = (req, res) => {
  res.send("Produce");
};

const getProduceForm = (req, res) => {
  res.send("Produce form");
};

export { getAllProduce, getProducePage, getProduceForm };
