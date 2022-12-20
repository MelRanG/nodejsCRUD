import { Request, Response } from 'express';
import { UserService } from '../service/userService';

const router = require('express').Router();

router.get('/:user_id', async function (req: Request, res: Response){
    try {
        console.log(req.params)
        const user = await (new UserService()).findByUserId(req.body)
        return res.json(user);
    } catch (err: any) {
        return res.status(400).json({message: err.message})
    }
})
router.post('/', async function (req: Request, res: Response) {
    try {
        const user = await (new UserService()).createUser(req.body)
        return res.json(user)
    } catch (err:any) {
        return res.status(400).json({message: err.message})
    }
})
router.put('/:id', async function (req: Request, res: Response) {
    const id = Number(req.params.id)
    const { userId, name } = req.body

    try {
        const user = await (new UserService()).updateUser({ id, userId, name })
        return res.json(user);
    } catch (err: any) {
        return res.status(400).json({message: err.message})
    }
})
router.delete('/:user_id', async function (req: Request, res: Response){
    try {
        console.log(req.params)
        const user = await (new UserService()).findByUserId(req.body)
        return res.json(user);
    } catch (err: any) {
        return res.status(400).json({message: err.message})
    }
})

module.exports = router;