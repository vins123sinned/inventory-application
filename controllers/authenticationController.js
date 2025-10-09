import { body, validationResult } from "express-validator";
import { lengthError, requiredErr } from "../utils.js";

const validateAuthentication = [
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password ${requiredErr}`)
    .isLength({ min: 1, max: 255 })
    .withMessage(`Password ${lengthError(255)}`),
];

const getAuthentication = (req, res, next) => {
  const { password } = req.query;

  if (password === "123") {
    next();
  } else {
    res.render("layout", {
      title: "Enter Password",
      path: "partials/authentication.ejs",
      redirect: req.path,
      errors: !password
        ? undefined
        : [
            {
              path: "password",
              msg: "Wrong password",
            },
          ],
    });
  }
};

const postAuthentication = [
  validateAuthentication,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("layout", {
        title: "Enter Password",
        path: "partials/authentication.ejs",
        redirect: req.body.redirect,
        errors: errors.array(),
      });
    }

    const { password, redirect } = req.body;
    res.redirect(`${redirect}?password=${password}`);
  },
];

export { getAuthentication, postAuthentication };
