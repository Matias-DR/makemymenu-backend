/* eslint-disable @typescript-eslint/no-misused-promises */

import {
  userDeleteByIdController,
  userGetByEmailController,
  userUpdateController
} from 'infraestructure/server/express/controller/user'
import { getByIdController } from 'infraestructure/server/express/controller/shared'
import { Router } from 'express'

const router = Router()

router.get('/id/:id', getByIdController)
router.get('/email/:email', userGetByEmailController)
router.patch('/', userUpdateController)
router.delete('/', userDeleteByIdController)

export default router
