import { getCustomRepository, Repository } from 'typeorm'
import { UserRepository } from '../repository/userRepository'
import { User } from '../domain/user'
import { userDto } from '../dto/userDto'
const {BadRequestError} = require('../../../global/error/badReqeust')


export class UserService{
    private userRepository: Repository<User>
    
    constructor() {
        this.userRepository = getCustomRepository(UserRepository)
    }
     async createUser({ name }: userDto) {
        const userAlreadyExists = await this.userRepository.findOne({ name })
        if (userAlreadyExists) {
           throw new BadRequestError("이미 가입한 회원입니다.")
        }
        const user = this.userRepository.create({ name })
        await this.userRepository.save(user)
        return user
    }
    async getUserList() {
        return await this.userRepository.find()
    }

    async findByUserId(user_id: number) {
        const user = await this.userRepository.findOne(user_id)
        if (user === undefined) {
            throw new BadRequestError("가입된 회원이 없습니다.")
        }
        return user
    }

    async updateUser({ user_id, name }: userDto) {
        const user = await this.userRepository.findOne(user_id)
        if (user === undefined) {
            throw new BadRequestError("가입된 회원이 없습니다.")
        }
        await this.userRepository.update(user.user_id, {
            "name": name
        })
        return await this.userRepository.findOne(user_id)
    }

    async deleteUser(user_id:number) {
        const user = await this.userRepository.delete(user_id)
        if (user.affected === 0) {
            throw new BadRequestError("가입된 회원이 없습니다.")
        }
        return user
    }
}