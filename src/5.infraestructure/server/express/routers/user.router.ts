/* eslint-disable @typescript-eslint/no-misused-promises */

import { SessionController, UserController } from '4.controllers'
import { SessionMongoDBRepositoryImplementation, UserMongoDBRepositoryImplementation } from '5.infraestructure/database/mongodb/repositories'
import {
  type Request,
  type Response,
  type NextFunction,
  Router
} from 'express'
import {
  sessionVerifyForAuthMiddleware,
  sessionVerifyMiddleware
} from '5.infraestructure/server/express/middlewares'

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
    await userController.create(req, res)
  }
)
router.patch(
  '/',
  sessionVerifyMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    await userController.update(req, res, next)
  },
  async (req: Request, res: Response) => {
    await sessionController.updateTokensFromData(req, res)
  }
)
router.delete(
  '/',
  sessionVerifyMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    await userController.delete(req, res, next)
  },
  async (req: Request, res: Response) => {
    await sessionController.delete(req, res)
  }
)

export default router
