/* eslint-disable @typescript-eslint/no-misused-promises */

import { SessionMongoDBRepositoryImplementation } from 'infraestructure/database/mongodb/implementations/repositories'
import { Router } from 'express'
import { SessionController } from 'controllers'
import { SessionMongoDBAdapter } from 'adapters/mongodb'

const controller = new SessionController(
  SessionMongoDBRepositoryImplementation,
  SessionMongoDBAdapter
)

const router = Router()
router.put('/', controller.updateTokens)
router.patch('/', controller.updateAccessToken)

export default router
