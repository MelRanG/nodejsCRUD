import express from 'express'
import "./global/config/dbConfig"
const ErrorHandlerMiddleware = require('./global/error/errorHandler')
const app = express();


app.use(express.json())
const { swaggerUi, specs } = require('./global/config/swaggerConfig')
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))
const userController = require('./domain/user/controller/userController');
const articleController = require('./domain/article/controller/articleController');

app.use('/users', userController);
app.use('/articles', articleController);
app.use(ErrorHandlerMiddleware)

app.listen(3000, () => {
    console.log('server start')
})