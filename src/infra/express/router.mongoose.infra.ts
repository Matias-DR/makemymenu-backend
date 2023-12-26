/* eslint-disable @typescript-eslint/no-misused-promises */

import {
  userAuthenticationControllerInfra,
  userCreateControllerInfra,
  userDeleteControllerInfra,
  userUpdateControllerInfra
} from './controllers/user'
import {
  // sessionCreateControllerInfra,
  // sessionGetByRefreshTokenControllerInfra,
  // sessionGetByAccessTokenControllerInfra,
  sessionDeleteByRefreshTokenControllerInfra,
  sessionDeleteByAccessTokenControllerInfra,
  sessionUpdateByRefreshTokenControllerInfra,
  sessionUpdateByAccessTokenControllerInfra
} from './controllers/session'
import {
  verifySessionMdd,
  verifySessionForAuthMdd,
  verifySessionForTokenUpdateMdd,
  verifyProviderSessionMdd
} from 'infra/express/middlewares'

import { Router } from 'express'

export default class RouterMongooseInfra {
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
      userCreateControllerInfra
    )
  }

  private updateUser (): void {
    this.userRouter.patch(
      '/',
      verifySessionMdd,
      userUpdateControllerInfra,
      sessionUpdateByAccessTokenControllerInfra
    )
  }

  private deleteUser (): void {
    this.userRouter.delete(
      '/',
      verifySessionMdd,
      userDeleteControllerInfra,
      sessionDeleteByAccessTokenControllerInfra
    )
    this.userRouter.delete(
      '/provider',
      verifyProviderSessionMdd,
      userDeleteControllerInfra
    )
  }

  private authentication (): void {
    this.authRouter.post(
      '/',
      verifySessionForAuthMdd,
      userAuthenticationControllerInfra
    )
  }

  private updateSession (): void {
    this.sessionRouter.patch(
      '/',
      verifySessionForTokenUpdateMdd,
      sessionUpdateByRefreshTokenControllerInfra
    )
  }

  private deleteSession (): void {
    this.sessionRouter.delete(
      '/refresh',
      verifySessionMdd,
      sessionDeleteByRefreshTokenControllerInfra
    )
    this.sessionRouter.delete(
      '/access',
      verifySessionMdd,
      sessionDeleteByAccessTokenControllerInfra
    )
  }
}
