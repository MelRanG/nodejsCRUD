import { getCustomRepository, Repository } from 'typeorm'
import { ArticleRepository } from '../../article/repository/articleRepository'
import { Article } from '../../article/domain/article'
import { User } from '../../user/domain/user'
import { UserRepository } from '../../user/repository/userRepository'
import { Picture } from '../domain/picture'
import { PictureRepository } from '../repository/pictureRepository'
import { pictureDto } from '../dto/pictureDto'
const {BadRequestError} = require('../../../global/error/badReqeust')


export class PictureService{
    private articleRepository: Repository<Article>
    private userRepository: Repository<User>
    private pictureRepository: Repository<Picture>
    
    constructor() {
        this.articleRepository = getCustomRepository(ArticleRepository)
        this.userRepository = getCustomRepository(UserRepository)
        this.pictureRepository = getCustomRepository(PictureRepository)
    }
    async createPicture({ user_id, article_id, content}: pictureDto) {
        const checkArticle = this.articleRepository.findOne(article_id)
        if (checkArticle === undefined) throw new BadRequestError("작성된 게시글이 없습니다.")
        const picture = this.pictureRepository.create({ content })
        const user = new User()
        const article = new Article()

        user.user_id = user_id!
        article.article_id = article_id!
        article.user = user
        picture.article = article
        await this.pictureRepository.save(picture)
        
        return picture
    }

    async findPictureByArticleId(article_id: number) {
        const picture = await this.pictureRepository.createQueryBuilder("picture")
            .where("article_id = :article_id", { article_id })
            .getMany()
        if (picture === undefined) {
            throw new BadRequestError("해당 게시글이 없습니다.")
        }
        return picture
    }

    // async updateArticle({user_id, article_id, content }: articleDto) {
    //     const article = await this.articleRepository.createQueryBuilder('article')
    //         .where("article_id = :article_id", { article_id })
    //         .andWhere("user_id = :user_id", { user_id })
    //         .getOne()
    //     if (article === undefined) {
    //         throw new BadRequestError("등록된 게시글이 없습니다.")
    //     }
    //     const result = await this.articleRepository.update(article.article_id, {
    //         "content": content,
    //         "user" : article.user
    //     })
    //     return await this.articleRepository.findOne(article_id)
    // }

    // async deleteArticleAll(user_id:number) {
    //     const articles = this.findArticleByUserId(user_id)
    //     const count = (await articles).length
    //     for (const article of await articles) { 
    //         await this.articleRepository.delete(article.article_id)
    //     }
    //     return count
    // }

    // async deleteArticle(user_id:number, article_id:number) {
    //     const article = await this.articleRepository.createQueryBuilder('article')
    //         .delete()
    //         .from('article')
    //         .where("article_id = :article_id", { article_id })
    //         .andWhere("user_id = :user_id", { user_id })
    //         .execute()
    //     if (article.affected === 0) {
    //         throw new BadRequestError("등록된 게시글이 없습니다.")
    //     }
    //     return article
    // }

}