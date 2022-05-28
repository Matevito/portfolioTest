const { body, validationResult } = require("express-validator");

const userValidator = [
    body("firstName", "A first name value is required").trim().isLength({ min: 3, max: 15 }).escape(),
    body("secondName", "A second name value is required").trim().isLength({ min: 3, max: 15}).escape(),
    body("title", "A title value is required").trim().isLength({ min: 3, max: 50}).escape(),
    body("description", "A valid description is required").trim().isLength({ min: 15, max: 1000}).escape(),
    body("imageURL", "A valid url is required").trim().isURL().escape(),
    (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            // if there are errors on te parsed data
            return res.status(400).json({
                msg: "Error with parsed data",
                error: errors.array()
            })
        };

        // no errros with parsed data, continue!
        next();
    }
]

module.exports = userValidator;