/* eslint-disable @typescript-eslint/no-misused-promises */

import { Exception } from '0.domain/exceptions/exception'
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
  async (req: Request, res: Response) => {
    try {
      await userController.signIn(req)
      const result = await sessionController.create(req)
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
router.patch(
  '/',
  sessionVerifyMiddleware,
  async (req: Request, res: Response) => {
    try {
      const result = await sessionController.updateAccessToken(req)
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

export default router
