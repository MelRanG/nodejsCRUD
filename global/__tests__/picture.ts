const request = require("supertest")
const userController = require("../../domain/user/controller/userController")
import { create, close, clear } from "../config/dbConfig"
import express from "express"

const app = express()
app.use(express.json())
app.use('/users', userController)

beforeAll(async ()=>{
    await create()
})

afterAll(async ()=>{
    await close()
})

beforeEach(async () => {
    clear()
})

const createUser = {
    name : "홍길동"
}
const createArticle = {
    content : "컨텐츠"
}
const createPicture = {
    content : "사진"
}

describe('content', () => {
    test('사진 create', async () => {
        await request(app).post("/users").send(createUser)
        await request(app).post("/users/1/articles").send(createArticle)

        const res = await request(app).post("/users/1/articles/1/pictures").send(createPicture).expect(200)
        expect(res.body.content).toEqual(createPicture.content)
    })
    test('사진 전체 조회', async () => {
        await request(app).post("/users").send(createUser)
        await request(app).post("/users/1/articles").send(createArticle)
        await request(app).post("/users/1/articles/1/pictures").send(createPicture)
        await request(app).post("/users/1/articles/1/pictures").send(createPicture)

        const res = await request(app).get("/users/1/articles/1/pictures").send(createPicture).expect(200)
        expect(res.body.length).toEqual(2)
    })
})
