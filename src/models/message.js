module.exports = {
    get: (con, idFrom, idToSend, callback) => {
        con.query(`SELECT content, messages.id as id, userIdToSend, userIdReceives, date,users.firstName, users.lastName FROM messages LEFT JOIN users ON messages.userIdToSend=users.id WHERE ( (userIdToSend = ${idToSend} and userIdReceives =${idFrom}) OR (userIdToSend =${idFrom} and userIdReceives =${idToSend}) )`, callback);
    },
    getById: (con, id, callback) => {
        con.query(`SELECT * FROM messages where id=${id}`, callback);
    },

    create: (con, data, callback) => {

        con.query(`INSERT INTO messages SET
            content= '${data.content}',
            userIdToSend= '${data.userIdToSend}',
            userIdReceives= '${data.userIdReceives}'
            `, callback);
    },

    destroy: (con, id, callback) => {
        con.query(`DELETE FROM messages where id=${id}`, callback);
    },
}