const { decodeToken } = require("../utils/jwt");

function userAuthenticated(req, res, next) {
    const { authorization } = req.headers;
    if (typeof authorization === 'undefined' || authorization === '') {
        return res.status(401).send({ response: 'El token es requerido' });
    }
    const token = authorization.replace('Bearer ', '');
    const dataToken = decodeToken(token);

    try {
        if (dataToken.exp < (new Date().getTime())) {
            return res.status(400).send({ response: 'El token ha expirado' });
        }

        next();

    } catch (error) {
        return res.status(400).send({ response: 'El token es inválido' });
    }


}

module.exports = {
    userAuthenticated
}