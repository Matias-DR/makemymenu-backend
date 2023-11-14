/* eslint-disable @typescript-eslint/no-misused-promises */

import * as userControllers from 'infraestructure/server/express/controller/user'
import * as sharedControllers from 'infraestructure/server/express/controller/shared'
import { Router } from 'express'

const router = Router()

router.post('/create', userControllers.userCreateController)
router.get('/get-by-id', sharedControllers.getByIdController)
router.get('/get-by-email', userControllers.userGetByEmailController)
router.patch('/update', userControllers.userUpdateController)
router.delete('/delete', userControllers.userDeleteByIdController)

export default router
