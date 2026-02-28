import "dotenv/config";
import express from "express";
import { configureAuth } from "./auth/passport.js";
import indexRouter from "./routes/indexRouter.js";
import authRouter from "./routes/authRouter.js";
import driveRouter from "./routes/driveRouter.js";

const app = express();

// Default middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Passport & Session
configureAuth(app);

// Global currentUser variable
app.use((req, res, next) => {
  res.locals.currentUser = req.user ?? null;
  next();
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/drive", driveRouter);

// 404
app.use((req, res) => {
  res.status(404).render("404", { title: "404 - Page Not Found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.render("error", {
    title: "Error",
    errorMessage: "An unexpected error occurred. Please try again.",
  });
});

// Server
const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
