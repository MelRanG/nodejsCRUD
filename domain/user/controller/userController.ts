import { Request, Response } from 'express';
import { UserService } from '../service/userService';

const router = require('express').Router();

router.get('/:user_id', (req:Request, res:Response) => {
    res.send('Hello')
})
router.post('/', async function (req: Request, res: Response) {
    
    console.log(req.body)
    try {
        const user = await (new UserService()).create(req.body)
        return res.json(user)
    } catch (err:any) {
        return res.status(400).json({message: err.message})
    }
    res.send('Hello')
})
router.put('/:user_id', (req:Request, res:Response) => {
    res.send('Hello')
})
router.delete('/:user_id', (req:Request, res:Response) => {
    res.send('Hello')
})

module.exports = router;