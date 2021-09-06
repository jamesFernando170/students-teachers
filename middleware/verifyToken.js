const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
    let token = req.headers["access-token"];

    if (token) {
        let secreyKey = config.get("secretkeys").jwt;
        let tkDecoded = jwt.verify(token, secreyKey);
        let currentDate = Math.floor(Date.now() / 1000);

        if (tkDecoded.exp >= currentDate) {
            next();
        } else {
            return res.status(400).json({
                mess: "This token invalid"
            });
        }
    } else {
        return res.status(400).json(
            {
                mess: "Not access token set."
            }
        );
    }
    next();
}