import userRouter from './user.router'
import authRouter from './auth.router'
import sessionRouter from './session.router'
import { Router } from 'express'

const router = Router()

router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/session', sessionRouter)

export default router
