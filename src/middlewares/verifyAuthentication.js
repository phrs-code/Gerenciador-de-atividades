const jwt = require('jsonwebtoken');

const verifyAuthenticate = (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(401).json({
            error: "@authorization/missing-token",
            message: "Acesso negado (Token de autenticação)"
        });
    };

    const [prefix, token] = authorization.split(' ');

    const invalidToken = {
            error: "@authorization/invalid-token",
            message: "Token provided is invalid"
        }

    if (prefix !== "Bearer") {
        return res.status(401).json(invalidToken);
    };

    if (!token) {
        return res.status(401).json(invalidToken);
    };

    jwt.verify(token, "secret", (err, decoded) => {
        if (err) {
            return res.status(401).json(invalidToken);
        }

        req.user = decoded;

        return next();
    });

};

module.exports = {
    verifyAuthenticate,
};