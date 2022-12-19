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
    userId : "id",
    name : "홍길동"
}

describe('user', () => {
    test('상태코드 200 리턴 & 값 삽입', async () => {
        const resPost = await request(app).post("/users")
            .send(createUser)
            .expect(200)
        expect(resPost.body.userId).toEqual(createUser.userId)
        expect(resPost.body.name).toEqual(createUser.name)
    })
})
