import { Repository, EntityRepository } from 'typeorm'
import { Picture } from '../domain/picture'

@EntityRepository(Picture)
class PictureRepository extends Repository<Picture>{ }
export { PictureRepository}