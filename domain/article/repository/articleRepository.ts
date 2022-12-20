import { Repository, EntityRepository } from 'typeorm'
import { Article } from '../domain/article'

@EntityRepository(Article)
class ArticleRepository extends Repository<Article>{ }
export { ArticleRepository}