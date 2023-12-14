import userRouter from './user.router'
import sessionRouter from './session.router'
import { Router } from 'express'

const router = Router()

router.use('/user', userRouter)
router.use('/session', sessionRouter)

export default router
