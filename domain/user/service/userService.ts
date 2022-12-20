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
     async createUser({ userId, name }: userDto) {
        const userAlreadyExists = await this.userRepository.findOne({ userId })
        if (userAlreadyExists) {
           throw new BadRequestError("이미 가입한 회원입니다.")
        }
        const user = this.userRepository.create({ userId, name })
        await this.userRepository.save(user)
        return user
    }

    async findByUserId(user_id:string) {
        const user = await this.userRepository.findOne(user_id)
        if (user === undefined) {
            throw new BadRequestError("가입된 회원이 없습니다.")
        }
        return user
    }

    async updateUser({ id, userId, name }: userDto) {
        const user = await this.userRepository.findOne(id)
        if (user === undefined) {
            throw new BadRequestError("가입된 회원이 없습니다.")
        }
        await this.userRepository.update(user.id, {
            "userId": userId,
            "name": name
        })
        return await this.userRepository.findOne(id)
    }

    async deleteUser(id:number) {
        const user = await this.userRepository.delete(id)
        if (user.affected === 0) {
            throw new BadRequestError("가입된 회원이 없습니다.")
        }
        return user
    }
}