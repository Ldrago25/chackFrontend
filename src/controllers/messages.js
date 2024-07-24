const Messages = require('../models/message');
const { decodeToken } = require("../utils/jwt");

module.exports = {
    index: (req, res) => {
        const dataToken = decodeToken(req.headers.authorization.split(' ')[1]);
        getMessages(req, req.query.idFrom, dataToken.user.id, res);
    },
    store: (req, res) => {
        console.log(req.body);
        Messages.create(req.con, req.body, (error, row) => {

            if (error) {
                res.status(500).send({ response: '' + error });
            } else {
                getMessages(req, req.body.userIdReceives, req.body.userIdToSend, res);
            }

        })
    },
    destroy: (req, res) => {
        Messages.destroy(req.con, req.params.id, (error, row) => {

            if (error) {
                res.status(500).send({ response: 'Ha ocurrido un error listando los mensajes' });
            } else {
                getMessages(req, res);
            }

        })
    }
}

function getMessages(req, idFrom, IdToSend, res) {
    Messages.get(req.con, idFrom, IdToSend, (error, rows) => {
        if (error) {
            res.status(500).send({ response: 'Ha ocurrido un error listando los mensajes' });
        } else {
            console.log(rows);
            const { io } = req;
            io.emit('messages', rows);
            res.status(200).send({ response: rows });
        }
    });
}