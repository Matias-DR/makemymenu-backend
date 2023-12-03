/* eslint-disable @typescript-eslint/no-misused-promises */

import {
  userCreateController,
  userDeleteByIdController,
  userGetByEmailController,
  userUpdateController,
  userSignInController
} from 'infraestructure/server/express/controller/user'
import { getByIdController } from 'infraestructure/server/express/controller/shared'
import { Router } from 'express'

const router = Router()

router.post('/', userCreateController)
router.get('/:id', getByIdController)
router.get('/:email', userGetByEmailController)
router.patch('/', userUpdateController)
router.delete('/', userDeleteByIdController)
router.post('/sign-in', userSignInController)

export default router
