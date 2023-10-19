/* eslint-disable no-unused-vars */
const passport = require("passport");

/**
 * @returns {void}
 */
function authentication() {
    /**
     * @param {import("express").Request}      req
     * @param {import("express").Response}     res
     * @param {import("express").NextFunction} next
     */
    return (req, res, next) => {
        passport.authenticate(
            ["jwt"],
            {
                session: false,
            },
            (error, user, info) => {
                if (error) return next(error);

                if (!user) {
                    return res.status(401).json({
                        success: false,
                        status: 401,
                        data: {},
                        message: "Unauthorized!",
                    });
                } else {
                    req.user = user;
                    return next();
                }
            },
        )(req, res, next);
    };
}

module.exports = { authentication };