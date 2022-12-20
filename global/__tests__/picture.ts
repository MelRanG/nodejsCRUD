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
    test('해당 게시글 사진 전체 삭제', async () => {
        await request(app).post("/users").send(createUser)
        await request(app).post("/users/1/articles").send(createArticle)
        await request(app).post("/users/1/articles/1/pictures").send(createPicture)
        await request(app).post("/users/1/articles/1/pictures").send(createPicture)
        
        const res = await request(app).delete("/users/1/articles/1/pictures").expect(200)
        expect(res.body).toEqual(2)
    })
    test('해당 게시글 사진 ID 삭제', async () => {
        await request(app).post("/users").send(createUser)
        await request(app).post("/users/1/articles").send(createArticle)
        await request(app).post("/users/1/articles/1/pictures").send(createPicture)
        
        const res = await request(app).delete("/users/1/articles/1/pictures/1").expect(200)
        expect(res.body.affected).toEqual(1)
    })
    test('해당 게시글 사진 수정', async () => {
        await request(app).post("/users").send(createUser)
        await request(app).post("/users/1/articles").send(createArticle)
        await request(app).post("/users/1/articles/1/pictures").send(createPicture)

        const updateContent = {content : "수정"}
        const res = await request(app).put("/users/1/articles/1/pictures/1").send(updateContent).expect(200)
        expect(res.body.content).toEqual(updateContent.content)
    })

    test('해당 사진 조회', async () => {
        await request(app).post("/users").send(createUser)
        await request(app).post("/users/1/articles").send(createArticle)
        await request(app).post("/users/1/articles/1/pictures").send(createPicture)

        const res = await request(app).get("/users/1/articles/1/pictures/1").expect(200)
        expect(res.body.content).toEqual(createPicture.content)
    })
})
