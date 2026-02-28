function index_get(req, res, next) {
  try {
    res.render("index", { title: "Welcome" });
  } catch (error) {
    next(error);
  }
}

export default { index_get };
