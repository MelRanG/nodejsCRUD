import { Repository, EntityRepository } from 'typeorm'
import { User } from '../domain/user'

@EntityRepository(User)
class UserRepository extends Repository<User>{ }
export { UserRepository}