/**PACKAGES */
var CryptoJS = require("crypto-js");
const config = require("config");
const jwt = require("jsonwebtoken");

/**Encrypt password */
exports.EncryptPassword = (password) => {
    let secretKey = config.get("secretkeys").cryptojs;
    var encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();

    return encryptedPassword;
};

exports.DecryptPassword = (cryptedPassword) => {
    let secretKey = config.get("secretkeys").cryptojs;
    let bytes = CryptoJS.AES.decrypt(cryptedPassword, secretKey);
    let originalpassword = bytes.toString(CryptoJS.enc.Utf8);

    return originalpassword;
};

exports.generateToken = (user) => {
    let secretKey = config.get("secretkeys").jwt;
    let token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: {
            username: user.username,
            id: user._id,
            rol: user.rol
        }
    }, secretKey);

    return token;
};