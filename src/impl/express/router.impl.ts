/* eslint-disable @typescript-eslint/no-misused-promises */

import type {
  UserControllerImpl,
  SessionControllerImpl
} from 'impl/express/controllers'
import {
  verifySessionMdd,
  verifySessionForAuthMdd
} from 'impl/express/middlewares'

import { Router } from 'express'

export default class RouterImpl {
  private readonly _router: Router
  private readonly _userRouter: Router
  private readonly _sessionRouter: Router
  private readonly _authRouter: Router

  constructor (
    private readonly userController: UserControllerImpl,
    private readonly sessionController: SessionControllerImpl
  ) {
    this._router = Router()
    this._userRouter = Router()
    this._sessionRouter = Router()
    this._authRouter = Router()
    this.configure()
    this.main.use('/user', this._userRouter)
    this.main.use('/session', this._sessionRouter)
    this.main.use('/auth', this._authRouter)
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
  }

  private createUser (): void {
    this.userRouter.post(
      '/',
      verifySessionForAuthMdd,
      this.userController.create
    )
  }

  private updateUser (): void {
    this.userRouter.patch(
      '/',
      verifySessionMdd,
      this.userController.update,
      this.sessionController.update
    )
  }

  private deleteUser (): void {
    this.userRouter.delete(
      '/',
      verifySessionMdd,
      this.userController.delete
    )
  }

  private authentication (): void {
    this.authRouter.delete(
      '/',
      verifySessionMdd,
      this.userController.delete
    )
  }

  private updateSession (): void {
    this.sessionRouter.patch(
      '/',
      verifySessionMdd,
      this.sessionController.update
    )
  }

  private deleteSession (): void {
    this.sessionRouter.delete(
      '/refresh',
      verifySessionMdd,
      this.sessionController.deleteByRefreshToken
    )
    this.sessionRouter.delete(
      '/access',
      verifySessionMdd,
      this.sessionController.deleteByRefreshToken
    )
  }
}
