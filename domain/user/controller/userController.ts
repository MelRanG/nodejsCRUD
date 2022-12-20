import { Request, Response } from 'express';
import { UserService } from '../service/userService';
import { ArticleService } from '../../article/service/articleService';

const {asyncWrapper} = require('../../../global/error/async');
const router = require('express').Router();

router.get('/', asyncWrapper(async(req: Request, res: Response) => {
    const user = await (new UserService()).getUserList()
    return res.json(user);
}))
router.post('/',  asyncWrapper(async(req: Request, res: Response) => {
    const user = await (new UserService()).createUser(req.body)
    return res.status(200).json(user)
}))
router.get('/:user_id', asyncWrapper(async (req: Request, res: Response) => {
    const user_id = Number(req.params.user_id)
    const user = await (new UserService()).findByUserId(user_id)
    return res.json(user);
}))

router.put('/:user_id', asyncWrapper(async(req: Request, res: Response) => {
    const user_id = Number(req.params.user_id)
    const { name } = req.body
    const user = await (new UserService()).updateUser({ user_id, name })
    return res.status(200).json(user);
}))

router.delete('/:user_id', asyncWrapper(async(req: Request, res: Response) => {
    const user_id = Number(req.params.user_id)
    const user = await (new UserService()).deleteUser(user_id)
    return res.json(user);
}))


// ARTICLES-------------------------------------------------------------
router.post('/:user_id/articles', asyncWrapper(async (req: Request, res: Response) => {
    const user_id = Number(req.params.user_id)
    const {content} = req.body
    const article = await (new ArticleService()).createArticle({ user_id, content })
    return res.status(200).json(article)
}))
router.get('/:user_id/articles', asyncWrapper(async (req: Request, res: Response) => {
    const user_id = Number(req.params.user_id)
    const article = await (new ArticleService()).findArticleByUserId(user_id)
    return res.status(200).json(article);
}))
router.delete('/:user_id/articles', asyncWrapper(async(req: Request, res: Response) => {
    const user_id = Number(req.params.user_id)
    const article = await (new ArticleService()).deleteArticleAll(user_id)
    return res.json(article);
}))
router.delete('/:user_id/articles/:article_id', asyncWrapper(async(req: Request, res: Response) => {
    const user_id = Number(req.params.user_id)
    const article_id = Number(req.params.article_id)
    const article = await (new ArticleService()).deleteArticle(user_id, article_id)
    return res.json(article);
}))
router.put('/:user_id/articles/:article_id', asyncWrapper(async(req: Request, res: Response) => {
    const user_id = Number(req.params.user_id)
    const article_id = Number(req.params.article_id)
    const { content } = req.body

    const article = await (new ArticleService()).updateArticle({ user_id, article_id, content })
    return res.status(200).json(article);
}))


module.exports = router;