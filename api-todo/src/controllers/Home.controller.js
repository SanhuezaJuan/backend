const homeController = async (req, res) => {
  res.sendFile("index.html", { root: "./client" });
};

export { homeController };
