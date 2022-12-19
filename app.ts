import express from 'express'
import "./global/config/dbConfig"
const app = express();

// const sqlite3 = require('sqlite3').verbose();

// // open database in memory
// let db = new sqlite3.Database(':memory:', (err:Error) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Connected to the in-memory SQlite database.');
// });

// close the database connection
// db.close((err:Error) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });
app.use(express.json())
const userController = require('./domain/user/controller/userController');
app.use('/users', userController);

app.listen(3000, () => {
    console.log('server start')
})