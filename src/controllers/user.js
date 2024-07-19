const User = require('../models/user');
const { getFilePath, removeFile } = require('../utils/auth');
const { createAccessToken, createRefreshToken } = require('../utils/jwt');

module.exports = {
    index: (req, res) => {
        User.get(req.con, (error, rows) => {
            if (error) {
                res.status(500).send({ response: 'Ha ocurrido un error listando los usuarios' });
            } else {
                res.status(200).send({ response: rows });
            }
        });
    },
    store: (req, res) => {
        req.body.img = '';
        if (req.files.img) {
            req.body.img = getFilePath(req.files.img);
        }
        User.create(req.con, req.body, (error, row) => {
            if (error) {
                if (req.body.img)
                    removeFile(req.body.img);
                res.status(500).send({ response: 'Ha ocurrido un error creando el usuario' });
            } else {
                res.status(200).send({ response: row });
            }
        });

    },
    readUser(req, res) {
        const { id } = req.params;
        console.log(id);
        User.getById(req.con, id, (error, row) => {
            if (error) {
                res.status(500).send({ response: 'Ha ocurrido un error trayendo el usuario con id: ' + id });
            } else {
                delete(row[0]).password
                let dataUser = row[0];
                res.status(200).send({ response: dataUser });
            }

        });

    },
    login: (req, res) => {
        const { email, password } = req.body;
        console.log('asd');
        User.getByEmail(req.con, email, (error, row) => {
            if (error) {
                removeFile(req.body.img);
                res.status(500).send({ response: 'Ha ocurrido un error trayendo el usuario' });
            } else {
                console.log(row.length);
                if (row.length == 0) {
                    res.status(500).send({ response: 'No se encontro ningun usuario con estas credenciales' });
                    return;
                }
                if (row[0].password !== req.body.password) {
                    res.status(500).send({ response: 'La contraseña no es correcta' });
                } else {
                    delete row[0].password;
                    const userData = row[0];
                    res.status(200).send({ response: { token: createAccessToken(userData), refreshToken: createRefreshToken(userData), user: row[0] } });
                }

            }

        });
    }
}