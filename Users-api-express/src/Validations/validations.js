import { check } from "express-validator";

let validations = [
  check("email")
    .isEmail()
    .withMessage("El email es invalido")

    .trim()
    .notEmpty()
    .withMessage("El email no puede estar vacio")
    .normalizeEmail()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),

  check("username")
    .notEmpty()
    .withMessage("El nombre de usuario no puede estar vacio")
    .trim()
    .isLength({ min: 5, max: 15 })
    .withMessage("La longitud del username debe ser mayor a 5 y menor a 15"),

  check("password")
    .notEmpty()
    .withMessage("La contraseña no puede estar vacia")
    .trim()
    .isLength({ min: 8 })
    .withMessage("La longitud de la contraseña debe ser mayor a 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%#*?&]{8,}$/
    ),
];

export { validations };
