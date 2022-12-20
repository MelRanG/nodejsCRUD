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

afterEach(async () => {
    await clear()
})

const createUser = {
    name : "홍길동"
}
const createArticle = {
    content : "컨텐츠"
}

describe('content', () => {
    test('게시글 create', async () => {
        await request(app).post("/users").send(createUser)
        const res = await request(app).post("/users/1/articles").send(createArticle).expect(200)
        expect(res.body.content).toEqual(createArticle.content)
    })
    test('게시글 find', async () => {
        await request(app).post("/users").send(createUser)
        await request(app).post("/users/1/articles").send(createArticle)
        await request(app).post("/users/1/articles").send(createArticle)
        
        const res = await request(app).get("/users/1/articles").expect(200)
        expect(res.body.length).toEqual(2)
    })
    test('해당 유저가 작성한 게시글 전체 삭제', async () => {
        await request(app).post("/users").send(createUser)
        await request(app).post("/users/1/articles").send(createArticle)
        await request(app).post("/users/1/articles").send(createArticle)
        
        const res = await request(app).delete("/users/1/articles").expect(200)
        expect(res.body).toEqual(2)
    })
    test('해당 유저가 작성한 게시글 ID 삭제', async () => {
        await request(app).post("/users").send(createUser)
        await request(app).post("/users/1/articles").send(createArticle)
        
        const res = await request(app).delete("/users/1/articles/1").expect(200)
        expect(res.body.affected).toEqual(1)
    })
    test('해당 유저가 작성한 게시글 수정', async () => {
        await request(app).post("/users").send(createUser)
        await request(app).post("/users/1/articles").send(createArticle)

        const updateContent = {content : "수정"}
        const res = await request(app).put("/users/1/articles/1").send(updateContent).expect(200)
        expect(res.body.content).toEqual(updateContent.content)
    })
})
