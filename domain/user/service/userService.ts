import { getCustomRepository, Repository } from 'typeorm'
import { UserRepository } from '../repository/userRepository'
import { User } from '../domain/user'
import { userDto } from '../dto/userDto'


export class UserService{
    private userRepository: Repository<User>
    
    constructor() {
        this.userRepository = getCustomRepository(UserRepository)
    }

    async createUser({ userId, name }: userDto) {
        const userAlreadyExists = await this.userRepository.findOne({ userId })
        if (userAlreadyExists) {
            console.log("유저 중복 --> 나중에 예외처리예정")
            return userAlreadyExists
        }
        const user = this.userRepository.create({ userId, name })
        await this.userRepository.save(user)
        return user
    }

    async findByUserId(user_id:string) {
        const user = await this.userRepository.findOne(user_id)
        if (user === undefined) {
            console.log("나중에 예외처리")
        }
        return user
    }

    async updateUser({ id, userId, name }: userDto) {
        const user = await this.userRepository.findOne(id)
        if (user === undefined) {
            console.log("나중에 예외처리")
            return
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
            console.log("나중에 예외처리")
            return
        }
        return user
    }
}