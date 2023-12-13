/* eslint-disable @typescript-eslint/no-misused-promises */

import { SessionController, UserController } from '4.controllers'
import { SessionMongoDBRepositoryImplementation, UserMongoDBRepositoryImplementation } from '5.infraestructure/database/mongodb/repositories'
import {
  type Request,
  type Response,
  Router
} from 'express'
import {
  sessionVerifyForAuthMiddleware,
  sessionVerifyMiddleware
} from '5.infraestructure/server/express/middlewares'
import { Exception } from '0.domain/exceptions/exception'

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
    try {
      await userController.create(req)
    } catch (error: any) {
      if (error instanceof Exception) {
        res.status(error.code).json(error.spanishMessage)
      } else {
        res.status(500).json()
      }
    }
  }
)
router.patch(
  '/',
  sessionVerifyMiddleware,
  async (req: Request, res: Response) => {
    try {
      await userController.update(req)
      await sessionController.updateFromData(req)
    } catch (error: any) {
      if (error instanceof Exception) {
        res.status(error.code).json(error.spanishMessage)
      } else {
        res.status(500).json()
      }
    }
  }
)
router.delete(
  '/',
  sessionVerifyMiddleware,
  async (req: Request, res: Response) => {
    try {
      await userController.delete(req)
      await sessionController.delete(req)
    } catch (error: any) {
      if (error instanceof Exception) {
        res.status(error.code).json(error.spanishMessage)
      } else {
        res.status(500).json()
      }
    }
  }
)

export default router
