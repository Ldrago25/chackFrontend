module.exports = {
    get: (con, callback) => {
        con.query('SELECT * FROM users', callback);
    },
    getById: (con, id, callback) => {
        con.query(`SELECT * FROM users where id=${id}`, callback);
    },
    getByEmail: (con, email, callback) => {
        con.query(`SELECT * FROM users where email='${email}' LIMIT 1`, callback);
    },
    create: (con, data, callback) => {
        const valueActive = typeof data.active !== 'undefined' ? data.active : 1;
        const valueRoleId = typeof data.roleId !== 'undefined' ? data.roleId : 2;
        con.query(`INSERT INTO users SET
            firstName= '${data.firstName}',
            lastName= '${data.lastName}',
            email= '${data.email}',
            password= '${data.password}',
            roleId= '${valueRoleId}',
            img= '${data.img}',
            active= '${valueActive}'
            `, callback);
    }
}