module.exports = {
    get: (con, callback) => {
        con.query('SELECT content, messages.id as id, userId,date,firstName,lastName FROM messages LEFT JOIN users ON messages.userId=users.id', callback);
    },
    getById: (con, id, callback) => {
        con.query(`SELECT * FROM messages where id=${id}`, callback);
    },

    create: (con, data, callback) => {

        con.query(`INSERT INTO messages SET
            content= '${data.content}',
            userId= '${data.userId}'
            `, callback);
    },

    destroy: (con, id, callback) => {
        con.query(`DELETE FROM messages where id=${id}`, callback);
    },
}