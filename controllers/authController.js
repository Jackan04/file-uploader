import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import { validationResult } from "express-validator";
import passport from "passport";

function sign_up_get(req, res, next) {
  try {
    res.render("auth/sign-up-form", { title: "Sign Up", validationErrors: [] });
  } catch (error) {
    next(error);
  }
}

async function sign_up_post(req, res, next) {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).render("auth/sign-up-form", {
        validationErrors: validationErrors.array(),
        title: "Sign Up",
      });
    }

    const { username, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username: username,
        password: passwordHash,
      },
    });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
}

function sign_in_get(req, res, next) {
  try {
    res.render("auth/sign-in-form", { title: "Sign In", validationErrors: [] });
  } catch (error) {
    next(error);
  }
}

function sign_in_post(req, res, next) {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).render("auth/sign-in-form", {
        validationErrors: validationErrors.array(),
        title: "Sign In",
      });
    }

    return passport.authenticate("local", {
      successRedirect: "/drive",
      failureRedirect: "/auth/sign-in",
    })(req, res, next);
  } catch (error) {
    next(error);
  }
}

function sign_out_get(req, res, next) {
  req.logout((error) => {
    if (error) {
      next(error);
    }
    res.redirect("/");
  });
}

export default {
  sign_in_get,
  sign_in_post,
  sign_up_get,
  sign_up_post,
  sign_out_get,
};
