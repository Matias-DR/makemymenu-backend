/* eslint-disable @typescript-eslint/no-misused-promises */

import {
  AuthMongoDBRepositoryImplementation,
  UserMongoDBRepositoryImplementation
} from 'infraestructure/database/mongodb/implementations/repositories'
import { Router } from 'express'
import { AuthController } from 'controllers'
import { AuthMongoDBAdapter } from 'adapters/mongodb'

const controller = new AuthController(
  AuthMongoDBRepositoryImplementation,
  UserMongoDBRepositoryImplementation,
  AuthMongoDBAdapter
)

const router = Router()
router.post('/sign-up', controller.signUp)
router.post('/sign-in', controller.signIn)

export default router
