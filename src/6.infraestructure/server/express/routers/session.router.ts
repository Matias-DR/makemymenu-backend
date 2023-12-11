/* eslint-disable @typescript-eslint/no-misused-promises */

import { SessionMongoDBRepositoryImplementation } from '6.infraestructure/database/mongodb/implementations/repositories'
import {
  type Request,
  type Response,
  Router
} from 'express'
import { SessionController } from '4.controllers'
import { SessionMongoDBAdapter } from '5.adapters/mongodb'

const controller = new SessionController(
  SessionMongoDBRepositoryImplementation,
  SessionMongoDBAdapter
)

const router = Router()
router.put(
  '/',
  async (req: Request, res: Response) => {
    await controller.updateTokens(res, res)
  }
)
router.patch(
  '/',
  async (req: Request, res: Response) => {
    await controller.updateAccessToken(res, res)
  }
)

export default router
