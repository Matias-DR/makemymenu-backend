/* eslint-disable @typescript-eslint/no-misused-promises */

import userRouter from './user.router'
import authRouter from './auth.router'
import { Router } from 'express'

const router = Router()

router.use('/user', userRouter)
router.use('/auth', authRouter)

export default router
