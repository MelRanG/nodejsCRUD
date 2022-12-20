import { Request, Response } from 'express';
import { ArticleService } from '../service/articleService';

const {asyncWrapper} = require('../../../global/error/async');
const router = require('express').Router();

router.get('/', asyncWrapper(async(req: Request, res: Response) => {
    const article = await (new ArticleService()).getArticleList()
    return res.json(article);
}))
router.post('/',  asyncWrapper(async(req: Request, res: Response) => {
    const article = await (new ArticleService()).createArticle(req.body)
    return res.status(200).json(article)
}))
router.get('/:article_id', asyncWrapper(async(req: Request, res: Response) => {
    const article = await (new ArticleService()).findByArticleId(req.body)
    return res.json(article);
}))

router.put('/:id', asyncWrapper(async(req: Request, res: Response) => {
    const article_id = Number(req.params.id)
    const { content } = req.body
    const article = await (new ArticleService()).updateArticle({ article_id, content })
    return res.status(200).json(article);
}))

router.delete('/:id', asyncWrapper(async(req: Request, res: Response) => {
    const id = Number(req.params.id)
    const article = await (new ArticleService()).deleteArticle(id)
    return res.json(article);
}))

module.exports = router;