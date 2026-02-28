function requireAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/auth/sign-in");
}

export { requireAuth };
