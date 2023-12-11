/* eslint-disable @typescript-eslint/no-misused-promises */

import { SessionController, UserController } from '4.controllers'
import { SessionMongoDBRepositoryImplementation, UserMongoDBRepositoryImplementation } from '6.infraestructure/database/mongodb/implementations/repositories'
import { SessionMongoDBAdapter, UserMongoDBAdapter } from '5.adapters/mongodb'
import {
  type Request,
  type Response,
  type NextFunction,
  Router
} from 'express'
import {
  sessionVerifyForAuthMiddleware,
  sessionVerifyMiddleware
} from '6.infraestructure/server/express/middlewares'

const userController = new UserController(
  UserMongoDBRepositoryImplementation
)
const sessionController = new SessionController(
  SessionMongoDBRepositoryImplementation
)

const router = Router()

router.post(
  '/',
  sessionVerifyForAuthMiddleware,
  async (req: Request, res: Response) => {
    await controller.signUp(req, res)
  }
)

router.patch(
  '/',
  sessionVerifyMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    await userController.update(req, res, next)
  },
  async (req: Request, res: Response) => {
    await sessionController.updateSession(req, res)
  }
)

export default router
