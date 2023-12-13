/* eslint-disable @typescript-eslint/no-misused-promises */

import { SessionController, UserController } from 'controllers'
import { SessionMongoDBRepositoryImplementation, UserMongoDBRepositoryImplementation } from 'infraestructure/database/mongodb/repositories'
import {
  type Request,
  type Response,
  Router
} from 'express'
import {
  sessionVerifyForAuthMiddleware,
  sessionVerifyMiddleware
} from 'infraestructure/server/express/middlewares'
import { Exception } from 'domain/exceptions/exception'

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
      res.status(201).json()
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
      const result = await sessionController.updateFromData(req)
      res.status(200).json(result)
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
      res.status(200).json()
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
