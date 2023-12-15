import { UnsuccessfulOperationException } from 'domain/exceptions/operation.exceptions'
import { ExpiredTokenException } from 'domain/exceptions/session.exceptions'
import {
  extractTokenFromHeaders,
  verifyToken
} from 'utils/token.util'
import {
  UserUseCases,
  SessionUseCases
} from 'application/use-cases'
import type {
  UserRepository,
  SessionRepository
} from 'domain/repositories'
import Controller from './controller'

import type {
  Request,
  Response
} from 'express'

export default class SessionController extends Controller {
  constructor (
    UserRepository: new () => UserRepository,
    SessionRepository: new () => SessionRepository
  ) {
    super(
      new UserUseCases(new UserRepository()),
      new SessionUseCases(new SessionRepository())
    )
  }

  async createSession (
    req: Request,
    res: Response
  ): Promise<void> {
    const userSignInInput = {
      email: req.body.email,
      password: req.body.password
    }
    try {
      const userSignInResult = await this.userUseCases.signIn(userSignInInput)
      const sessionCreateInput = {
        id: userSignInResult.id,
        email: req.body.email
      }
      const sessionCreateResult = await this.sessionUseCases.create(sessionCreateInput)
      const output = {
        access: sessionCreateResult.access,
        refresh: sessionCreateResult.refresh
      }
      res.status(200).json(output)
    } catch (error: any) {
      this.error(
        res,
        error
      )
    }
  }

  async updateSessionAccessToken (
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const token = extractTokenFromHeaders(req.headers)
      let exception = new UnsuccessfulOperationException()
      try {
        verifyToken(token)
      } catch (error: any) {
        if (error instanceof ExpiredTokenException) {
          const result = await this.sessionUseCases.updateAccessToken(token)
          res.status(200).json(result)
        } else {
          exception = error
        }
      }
      throw exception
    } catch (error: any) {
      this.error(
        res,
        error
      )
    }
  }

  async deleteSession (
    req: Request,
    res: Response
  ): Promise<void> {
    const token = extractTokenFromHeaders(req.headers)
    await this.sessionUseCases.deleteByAccessToken(token)
  }
}
