import { Request, Response } from 'express';
import { UserService } from '../service/userService';

const {asyncWrapper} = require('../../../global/error/async');
const router = require('express').Router();

router.get('/:user_id', asyncWrapper(async(req: Request, res: Response) => {
    const user = await (new UserService()).findByUserId(req.body)
    return res.json(user);

}))
router.post('/',  asyncWrapper(async(req: Request, res: Response) => {
    const user = await (new UserService()).createUser(req.body)
    return res.status(200).json(user)
}))
// router.post('/',  async function (req: Request, res: Response) {
//     const user = await (new UserService()).createUser(req.body)
//     return res.json(user)
//     // try {
//     //     const user = await (new UserService()).createUser(req.body)
//     //     return res.json(user)
//     // } catch (err:any) {
//     //     return res.status(400).json({message: err.message})
//     // }
// })
router.put('/:id', asyncWrapper(async(req: Request, res: Response) => {
    const id = Number(req.params.id)
    const { userId, name } = req.body
    const user = await (new UserService()).updateUser({ id, userId, name })
    return res.status(200).json(user);
}))

router.delete('/:id', asyncWrapper(async(req: Request, res: Response) => {
    const id = Number(req.params.id)
    const user = await (new UserService()).deleteUser(id)
    return res.json(user);
}))

module.exports = router;