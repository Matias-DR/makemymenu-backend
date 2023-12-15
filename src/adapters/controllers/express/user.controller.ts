import {
  extractTokenFromHeaders,
  decodeToken
} from 'utils/token.util'
import Controller from './controller'
import {
  UserUseCases,
  SessionUseCases
} from 'application/use-cases'
import type {
  UserRepository,
  SessionRepository
} from 'domain/repositories'

import type {
  Request,
  Response
} from 'express'

export default class UserController extends Controller {
  constructor (
    UserRepository: new () => UserRepository,
    SessionRepository: new () => SessionRepository
  ) {
    super(
      new UserUseCases(new UserRepository()),
      new SessionUseCases(new SessionRepository())
    )
  }

  async createUser (
    req: Request,
    res: Response
  ): Promise<void> {
    const input = {
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    }
    try {
      await this.userUseCases.create(input)
      res.status(201).json()
    } catch (error: any) {
      this.error(
        res,
        error
      )
    }
  }

  async updateUser (
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const token = extractTokenFromHeaders(req.headers)
      const decoded = decodeToken(token)
      const user = {
        id: decoded.id,
        email: decoded.email
      }
      const updateUserInput = {
        ...user,
        ...req.body
      }
      await this.userUseCases.update(updateUserInput)
      await this.sessionUseCases.deleteByAccessToken(token)
      const result = await this.sessionUseCases.create(user)
      const output = {
        access: result.access,
        refresh: result.refresh
      }
      res.status(200).json(output)
    } catch (error: any) {
      this.error(
        res,
        error
      )
    }
  }

  async deleteUser (
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const token = extractTokenFromHeaders(req.headers)
      const decoded = decodeToken(token)
      const input = {
        id: decoded.id,
        password: req.body.password
      }
      await this.userUseCases.deleteById(input)
      res.status(200).json()
    } catch (error: any) {
      this.error(
        res,
        error
      )
    }
  }
}
