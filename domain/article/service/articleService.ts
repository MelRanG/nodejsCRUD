import { getCustomRepository, Repository } from 'typeorm'
import { ArticleRepository } from '../repository/articleRepository'
import { Article } from '../domain/article'
import { User } from '../../user/domain/user'
import { UserRepository } from '../../user/repository/userRepository'
import { articleDto } from '../dto/articleDto'
const {BadRequestError} = require('../../../global/error/badReqeust')


export class ArticleService{
    private articleRepository: Repository<Article>
    private userRepository: Repository<User>
    
    constructor() {
        this.articleRepository = getCustomRepository(ArticleRepository)
        this.userRepository = getCustomRepository(UserRepository)
    }
    async createArticle({ content, user_id}: articleDto) {
        const checkUser = this.userRepository.findOne(user_id)
        if (checkUser === undefined) throw new BadRequestError("가입된 회원이 없습니다.")
        const article = this.articleRepository.create({ content})
        const user = new User()
        user.user_id = user_id!
        article.user = user
        await this.articleRepository.save(article)
        return article
    }
    async getArticleList() {
        return await this.articleRepository.find()
    }

    async findArticleByUserId(user_id: number) {
        const article = await this.articleRepository.createQueryBuilder("article")
            .where("user_id = :user_id", { user_id })
            .getMany()
        if (article === undefined) {
            throw new BadRequestError("해당 작성자가 작성한 게시글이 없습니다.")
        }
        return article
    }

    async updateArticle({article_id, content }: articleDto) {
        const article = await this.articleRepository.findOne(article_id)
        if (article === undefined) {
            throw new BadRequestError("등록된 게시글이 없습니다.")
        }
        await this.articleRepository.update(article.article_id, {
            "content": content,
        })
        return await this.articleRepository.findOne(article_id)
    }
    async deleteArticleAll(user_id:number) {
        const articles = this.findArticleByUserId(user_id)
        const count = (await articles).length
        for (const article of await articles) { 
            await this.articleRepository.delete(article.article_id)
        }
        return count
    }

    async deleteArticle(user_id:number, article_id:number) {
        const article = await this.articleRepository.createQueryBuilder('article')
            .delete()
            .from('article')
            .where("article_id = :article_id", { article_id })
            .andWhere("user_id = :user_id", { user_id })
            .execute()
        if (article.affected === 0) {
            throw new BadRequestError("등록된 게시글이 없습니다.")
        }
        return article
    }
}