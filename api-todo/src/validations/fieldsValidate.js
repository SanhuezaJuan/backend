import { check } from "express-validator";

const validations = [
  check("username")
    .trim()
    .notEmpty()
    .isLength({ min: 5, max: 15 })
    .withMessage("El campo username no puede estar vacio"),
  check("password")
    .trim()
    .notEmpty()
    .isLength({ min: 8, max: 15 })
    .withMessage("La contraseña no debe estar vacia"),
];

export { validations };
