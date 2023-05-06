const errorController = {};

errorController.pageNotFound = (req, res) => {
  res.status(404).render("error/err", {
    title: "Page Not Found",
    message: "The requested page could not be found.",
  });
};

module.exports = errorController;
