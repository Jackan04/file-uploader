import { body } from "express-validator";
import { prisma } from "../lib/prisma.js";

const signUpValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .bail()
    .custom(async (username) => {
      const existingUser = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      if (existingUser) {
        throw new Error("Username is already taken");
      }
    })
    .withMessage("Username is already taken"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const signInValidation = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const folderValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ max: 50 })
    .withMessage("Name cannot exceed 50 characters"),
];

const fileUploadValidation = [
  body("file")
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Please upload a file");
      }

      return true;
    })
    .withMessage("Please upload a file")
    .bail()
    .custom((value, { req }) => {
      if (req.file.size > 5 * 1024 * 1024) {
        throw new Error("File size cannot exceed 5MB");
      }

      return true;
    })
    .withMessage("File size cannot exceed 5MB"),
];

const fileUpdateValidation = [
  body("name").trim().notEmpty().withMessage("Name cannot be empty"),
];

export {
  signUpValidation,
  signInValidation,
  folderValidation,
  fileUploadValidation,
  fileUpdateValidation,
};
