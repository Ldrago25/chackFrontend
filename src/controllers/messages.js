const Messages = require('../models/message');


module.exports = {
    index: (req, res) => {
        getMessages(req, res);
    },
    store: (req, res) => {
        Messages.create(req.con, req.body, (error, row) => {

            if (error) {
                res.status(500).send({ response: 'Ha ocurrido un error listando los mensajes' });
            } else {
                getMessages(req, res);
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

function getMessages(req, res) {
    Messages.get(req.con, (error, rows) => {
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