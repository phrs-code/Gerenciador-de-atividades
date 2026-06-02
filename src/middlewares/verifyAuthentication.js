const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env')

const verifyAuthenticate = (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(401).json({
            error: "@authorization/missing-token",
            message: "Acesso negado (Token de autenticação)"
        });
    }

    const [prefix, token] = authorization.split(' ');

    const invalidToken = {
            error: "@authorization/invalid-token",
            message: "Token provided is invalid"
        }

    if (prefix !== "Bearer") {
        return res.status(401).json(invalidToken);
    }

    if (!token) {
        return res.status(401).json(invalidToken);
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // Injeta o ID do usuário na requisição
        req.userId = decoded.id; 
        return next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                error: "@authorization/token-expired",
                message: "O seu token expirou. Faça login novamente." 
            });
        }

        return res.status(401).json({ 
            error: "@authorization/token-invalid",
            message: "Token inválido ou corrompido." 
        });
    }
};

module.exports = {
    verifyAuthenticate,
};