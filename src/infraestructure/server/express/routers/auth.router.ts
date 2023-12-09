/* eslint-disable @typescript-eslint/no-misused-promises */

import {
  AuthMongoDBRepositoryImplementation,
  UserMongoDBRepositoryImplementation
} from 'infraestructure/database/mongodb/implementations/repositories'
import {
  type Request,
  type Response,
  Router
} from 'express'
import { AuthController } from 'controllers'
import { AuthMongoDBAdapter } from 'adapters/mongodb'
import { sessionVerifyForAuthPagesMiddleware } from 'infraestructure/server/express/middlewares'

const controller = new AuthController(
  AuthMongoDBRepositoryImplementation,
  UserMongoDBRepositoryImplementation,
  AuthMongoDBAdapter
)

const router = Router()
router.post(
  '/sign-up',
  sessionVerifyForAuthPagesMiddleware,
  async (req: Request, res: Response) => {
    await controller.signUp(req, res)
  }
)
router.post(
  '/sign-in',
  sessionVerifyForAuthPagesMiddleware,
  async (req: Request, res: Response) => {
    await controller.signIn(req, res)
  }
)

export default router
