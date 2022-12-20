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
    userId : "gildong",
    name : "홍길동"
}

describe('user', () => {
    test('유저 create', async () => {
        const resPost = await request(app).post("/users")
            .send(createUser)
            .expect(200)
        expect(resPost.body.userId).toEqual(createUser.userId)
        expect(resPost.body.name).toEqual(createUser.name)
    })
    test('유저 find', async () => { 
        await request(app).post("/users").send(createUser)
        const resGet = await request(app).get("/users/id")
        expect(resGet.body.userId).toEqual(createUser.userId)
        expect(resGet.body.name).toEqual(createUser.name)
    })
})
