import express from 'express'
import "./global/config/dbConfig"
const ErrorHandlerMiddleware = require('./global/error/errorHandler')
const app = express();


app.use(express.json())
const userController = require('./domain/user/controller/userController');

app.use('/users', userController);
app.use(ErrorHandlerMiddleware)

app.listen(3000, () => {
    console.log('server start')
})