// const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'node_user',
//     password: 'password_seguro', 
//     database: 'node'
// });

// connection.connect((error) => {
//     if (error) {
//         console.error('❌ El error de conexión es: ' + error);
//         return;
//     }
//     console.log('✅ Conexión exitosa a la base de datos');
//     connection.end();

// });

// connection.query('SELECT * FROM users', (error, results) => {
//     if (error) {
//         console.error('❌ El error de consulta es: ' + error);
//         return;
//     }
//     console.log('✅ Consulta exitosa:', results);
// });


 
const pool = require('./database');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT } = require('./env');

pool.connect((error) => {
    if (error) {
        console.error('❌ El error de conexión es: ' + error);
        return;
    }
    console.log('✅ Conexión exitosa a la base de datos');
}
);

pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
        console.error('❌ El error de consulta es: ' + error);
        return;
    }
    console.log('✅ Consulta exitosa:', results);
});

