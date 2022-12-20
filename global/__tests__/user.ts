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
const createPicture = {
    content : "사진"
}

describe('user', () => {
    test('유저 create', async () => {
        const res = await request(app).post("/users")
            .send(createUser)
            .expect(200)
        expect(res.body.name).toEqual(createUser.name)
    })
    test('유저 전체 조회', async () => { 
        await request(app).post("/users").send(createUser)
        const createUser2 = {name : "김길동"}
        await request(app).post("/users").send(createUser2)

        const res = await request(app).get("/users").expect(200)
        expect(res.body.length).toEqual(2)
    })    
    test('유저 find', async () => { 
        await request(app).post("/users").send(createUser)
        const res = await request(app).get("/users/1").expect(200)
        expect(res.body.name).toEqual(createUser.name)
    })
    test('유저 update', async () => { 
        const updateUser = {
            name : "홍"
        }
        await request(app).post("/users").send(createUser)
        const res = await request(app).put("/users/1").send(updateUser).expect(200)
        expect(res.body.name).toEqual(updateUser.name)
    })
    test('유저 delete', async () => {
        await request(app).post("/users").send(createUser)
        const res = await request(app).delete("/users/1").expect(200)
        expect(res.body.affected).toEqual(1)
    })
})