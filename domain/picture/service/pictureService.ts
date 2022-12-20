import { getCustomRepository, Repository } from 'typeorm'
import { ArticleRepository } from '../../article/repository/articleRepository'
import { Article } from '../../article/domain/article'
import { User } from '../../user/domain/user'
import { Picture } from '../domain/picture'
import { PictureRepository } from '../repository/pictureRepository'
import { pictureDto } from '../dto/pictureDto'
const {BadRequestError} = require('../../../global/error/badReqeust')


export class PictureService{
    private articleRepository: Repository<Article>
    private pictureRepository: Repository<Picture>
    
    constructor() {
        this.articleRepository = getCustomRepository(ArticleRepository)
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

    async deletePictureAll(article_id:number) {
        const pictures = this.findPictureByArticleId(article_id)
        const count = (await pictures).length
        for (const picture of await pictures) { 
            await this.pictureRepository.delete(picture.picture_id)
        }
        return count
    }

    async deletePicture(article_id:number, picture_id:number) {
        const picture = await this.pictureRepository.createQueryBuilder('picture')
            .delete()
            .from('picture')
            .where("article_id = :article_id", { article_id })
            .andWhere("picture_id = :picture_id", { picture_id })
            .execute()
        if (picture.affected === 0) {
            throw new BadRequestError("등록된 사진이 없습니다.")
        }
        return picture
    }

    async updatePicture({article_id, picture_id, content }: pictureDto) {
        const picture = await this.pictureRepository.createQueryBuilder('picture')
            .where("article_id = :article_id", { article_id })
            .andWhere("picture_id = :picture_id", { picture_id })
            .getOne()
        if (picture === undefined) {
            throw new BadRequestError("등록된 사진이 없습니다.")
        }
        const result = await this.pictureRepository.update(picture.picture_id, {
            "content": content,
            "article" : picture.article
        })
        return await this.pictureRepository.findOne(article_id)
    }
    async findByPictureId(article_id:number, picture_id:number) {
        const picture = await this.pictureRepository.createQueryBuilder('picture')
            .where("article_id = :article_id", { article_id })
            .andWhere("picture_id = :picture_id", { picture_id })
            .getOne()
        if (picture === undefined) {
            throw new BadRequestError("등록된 사진이 없습니다.")
        }
        return picture
    }
}