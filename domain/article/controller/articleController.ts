import { Request, Response } from 'express';
import { ArticleService } from '../service/articleService';

const {asyncWrapper} = require('../../../global/error/async');
const router = require('express').Router();

router.get('/', asyncWrapper(async(req: Request, res: Response) => {
    const article = await (new ArticleService()).getArticleList()
    return res.json(article);
}))

module.exports = router;