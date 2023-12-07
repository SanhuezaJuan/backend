/**
 *
 * @param {Object} options
 * @returns {Function}
 */
export const ensureLogin = (options) => {
  if (typeof options === "string") {
    options = { redirectTo: options };
  }

  console.log(typeof options);

  var url = options.redirectTo || "/fallo";
  return function (req, res, next) {
    if (!req.isAuthenticated()) {
      return res.redirect(url);
    }

    next();
  };
};
