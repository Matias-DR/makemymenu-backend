/* eslint-disable @typescript-eslint/no-misused-promises */

import {
  AuthMongoDBRepositoryImplementation,
  UserMongoDBRepositoryImplementation
} from '6.infraestructure/database/mongodb/implementations/repositories'
import {
  type Request,
  type Response,
  Router
} from 'express'
import { AuthController } from '4.controllers'
import { sessionVerifyForAuthMiddleware } from '6.infraestructure/server/express/middlewares'

const controller = new AuthController(
  AuthMongoDBRepositoryImplementation,
  UserMongoDBRepositoryImplementation
)

const router = Router()

router.post(
  '/',
  sessionVerifyForAuthMiddleware,
  async (req: Request, res: Response) => {
    await controller.signIn(req, res)
  }
)

router.delete(
  '/',
  sessionVerifyForAuthMiddleware,
  async (req: Request, res: Response) => {
    await controller.signOut(req, res)
  }
)

export default router
