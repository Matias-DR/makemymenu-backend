/* eslint-disable @typescript-eslint/no-misused-promises */

import {
  authSignUpController,
  authSignInController
} from 'infraestructure/server/express/controller/auth'
import { Router } from 'express'

const router = Router()

router.post('/sign-up', authSignUpController)
router.post('/sign-in', authSignInController)

export default router
