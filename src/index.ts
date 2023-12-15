/* eslint-disable @typescript-eslint/no-misused-promises */

import {
  UserMongoDBRepositoryImplementation,
  SessionMongoDBRepositoryImplementation
} from 'adapters/gateways/mongoose/repositories'
import {
  sessionVerifyForAuthMiddleware,
  sessionVerifyMiddleware
} from 'utils/middlewares'
import {
  UserController,
  SessionController
} from 'adapters/controllers/express'

import express, {
  Router,
  type Application
} from 'express'
import cors, { type CorsOptions } from 'cors'
import 'dotenv/config'

const app: Application = express()

const corsOptions: CorsOptions = {
  origin: '*'
}

const userController = new UserController(
  UserMongoDBRepositoryImplementation,
  SessionMongoDBRepositoryImplementation
)

const sessionController = new SessionController(
  UserMongoDBRepositoryImplementation,
  SessionMongoDBRepositoryImplementation
)

const userRouter = Router()

userRouter.post(
  '/',
  sessionVerifyForAuthMiddleware,
  userController.createUser
)
userRouter.patch(
  '/',
  sessionVerifyMiddleware,
  userController.updateUser
)
userRouter.delete(
  '/',
  sessionVerifyMiddleware,
  userController.deleteUser
)

const sessionRouter = Router()

sessionRouter.post(
  '/',
  sessionVerifyForAuthMiddleware,
  sessionController.createSession
)
sessionRouter.patch(
  '/',
  sessionVerifyMiddleware,
  sessionController.updateSessionAccessToken
)
sessionRouter.delete(
  '/',
  sessionVerifyMiddleware,
  sessionController.deleteSession
)

const router = Router()

router.use('/user', userRouter)
router.use('/session', sessionRouter)

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)

const EXPRESS_SERVER_PORT: number = parseInt(process.env.EXPRESS_SERVER_PORT ?? '3000')
const EXPRESS_SERVER_HOST: string = process.env.EXPRESS_SERVER_HOST ?? 'localhost'

app
  .listen(EXPRESS_SERVER_PORT, EXPRESS_SERVER_HOST, () => {
    console.log(`Server is running on port ${EXPRESS_SERVER_PORT}.`)
  })
  .on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      throw Error('Error: address already in use')
    } else {
      throw Error(err)
    }
  })

export default app
