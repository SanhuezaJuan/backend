export const registerController = async (req, res) => {
  res.sendFile("register.html", { root: "./client" });
};
