const mysql = require('mysql');
require('dotenv').config();

const dbConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD
});

dbConnection.connect((err) => {
    if(err){
        throw err;
    }
    console.log("Connected successfully to MySQL Server.");
});

module.exports = dbConnection;