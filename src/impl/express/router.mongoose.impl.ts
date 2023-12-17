/* eslint-disable @typescript-eslint/no-misused-promises */

import { mongoose as userCreateController } from './controllers/user/create.user.controller.impl'
import { mongoose as userUpdateController } from './controllers/user/update.user.controller.impl'
import { mongoose as userDeleteController } from './controllers/user/delete.user.controller.impl'
import { mongoose as userAuthenticationController } from './controllers/user/authentication.user.controller.impl'
import { mongoose as sessionCreateController } from './controllers/session/create.session.controller.impl'
import { mongoose as sessionUpdateController } from './controllers/session/update.session.controller.impl'
import { mongoose as sessionDeleteByRefreshTokenController } from './controllers/session/delete-by-refresh-token.session.controller.impl'
import { mongoose as sessionDeleteByAccessTokenController } from './controllers/session/delete-by-access-token.session.controller.impl'
import {
  verifySessionMdd,
  verifySessionForAuthMdd
} from 'impl/express/middlewares'

import { Router } from 'express'

export default class RouterMongooseImpl {
  private readonly _router: Router
  private readonly _userRouter: Router
  private readonly _sessionRouter: Router
  private readonly _authRouter: Router

  constructor () {
    this._router = Router()
    this._userRouter = Router()
    this._sessionRouter = Router()
    this._authRouter = Router()
    this.configure()
  }

  get main (): Router {
    return this._router
  }

  get userRouter (): Router {
    return this._userRouter
  }

  get sessionRouter (): Router {
    return this._sessionRouter
  }

  get authRouter (): Router {
    return this._authRouter
  }

  private configure (): void {
    this.createUser()
    this.updateUser()
    this.deleteUser()
    this.authentication()
    this.updateSession()
    this.deleteSession()
    this.main.use('/user', this._userRouter)
    this.main.use('/session', this._sessionRouter)
    this.main.use('/auth', this._authRouter)
  }

  private createUser (): void {
    this.userRouter.post(
      '/',
      verifySessionForAuthMdd,
      userCreateController
    )
  }

  private updateUser (): void {
    this.userRouter.patch(
      '/',
      verifySessionMdd,
      userUpdateController,
      sessionUpdateController
    )
  }

  private deleteUser (): void {
    this.userRouter.delete(
      '/',
      verifySessionMdd,
      userDeleteController,
      sessionDeleteByAccessTokenController
    )
  }

  private authentication (): void {
    this.authRouter.post(
      '/',
      verifySessionMdd,
      userAuthenticationController,
      sessionCreateController
    )
  }

  private updateSession (): void {
    this.sessionRouter.patch(
      '/',
      verifySessionMdd,
      sessionUpdateController
    )
  }

  private deleteSession (): void {
    this.sessionRouter.delete(
      '/refresh',
      verifySessionMdd,
      sessionDeleteByRefreshTokenController
    )
    this.sessionRouter.delete(
      '/access',
      verifySessionMdd,
      sessionDeleteByAccessTokenController
    )
  }
}
