import { getCustomRepository, Repository } from 'typeorm'
import { UserRepository } from '../repository/userRepository'
import { User } from '../domain/user'
import { userDto } from '../dto/userDto'


export class UserService{
    private userRepository: Repository<User>
    
    constructor() {
        this.userRepository = getCustomRepository(UserRepository)
    }

    async create({ userId, name }: userDto) {
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
}