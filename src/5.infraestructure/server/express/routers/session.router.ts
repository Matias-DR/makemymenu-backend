/* eslint-disable @typescript-eslint/no-misused-promises */

import {
  SessionController,
  UserController
} from '4.controllers'
import {
  SessionMongoDBRepositoryImplementation,
  UserMongoDBRepositoryImplementation
} from '5.infraestructure/database/mongodb/repositories'
import {
  sessionVerifyForAuthMiddleware,
  sessionVerifyMiddleware
} from '5.infraestructure/server/express/middlewares'
import {
  type Request,
  type Response,
  type NextFunction,
  Router
} from 'express'

const sessionController = new SessionController(
  SessionMongoDBRepositoryImplementation
)
const userController = new UserController(
  UserMongoDBRepositoryImplementation
)

const router = Router()

router.post(
  '/',
  sessionVerifyForAuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    await userController.signIn(req, res, next)
  },
  async (req: Request, res: Response) => {
    await sessionController.create(req, res)
  }
)
router.delete(
  '/',
  sessionVerifyForAuthMiddleware,
  async (req: Request, res: Response) => {
    await sessionController.delete(req, res)
  }
)
router.patch(
  '/',
  sessionVerifyMiddleware,
  async (req: Request, res: Response) => {
    await sessionController.updateAccessToken(res, res)
  }
)

export default router
