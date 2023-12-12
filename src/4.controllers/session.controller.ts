import { Exception } from '0.domain/exceptions/exception'
import { ExpiredTokenException } from '0.domain/exceptions/session.exceptions'
import { AccessField } from '0.domain/fields/session'
import type { SessionRepository } from '0.domain/repositories'
import { SessionUseCases } from '3.use-cases'

export default class SessionController {
  private readonly repository: SessionRepository
  private readonly useCases: SessionUseCases

  constructor (Repository: new () => SessionRepository) {
    this.repository = new Repository()
    this.useCases = new SessionUseCases(this.repository)
  }

  async create (
    req: any,
    res: any
  ): Promise<void> {
    const data = {
      id: req.body.id,
      email: req.body.email
    }
    try {
      const result = await this.useCases.create(data)
      const output = {
        access: result.access,
        refresh: result.refresh
      }
      res.status(200).json(output)
    } catch (error: any) {
      res.status(error.code).json(error.spanishMessage)
    }
  }

  async delete (
    req: any,
    res: any
  ): Promise<void> {
    const token = AccessField.getTokenFromHeader(req.authorization)
    const access = AccessField.constructFromToken(token)
    try {
      await this.useCases.delete(access)
      res.status(200).json()
    } catch (error: any) {
      res.status(error.code).json(error.spanishMessage)
    }
  }

  async updateTokensFromData (
    req: any,
    res: any
  ): Promise<void> {
    const token = AccessField.getTokenFromHeader(req.authorization)
    const access = AccessField.constructFromToken(token)
    const data = {
      id: req.body.id,
      email: req.body.email
    }
    try {
      await this.useCases.delete(access)
      const result = await this.useCases.create(data)
      const output = {
        access: result.access,
        refresh: result.refresh
      }
      res.status(200).json(output)
    } catch (error: any) {
      res.status(error.code).json(error.spanishMessage)
    }
  }

  async updateAccessToken (
    req: any,
    res: any
  ): Promise<void> {
    const token = AccessField.getTokenFromHeader(req.authorization)
    const access = AccessField.constructFromToken(token)
    try {
      access.test()
    } catch (error: any) {
      if (error instanceof ExpiredTokenException) {
        try {
          const result = await this.useCases.updateAccessToken(token)
          res.status(200).json(result)
          return
        } catch (error: any) {
          if (error instanceof Exception) {
            res.status(error.code).json(error.spanishMessage)
            return
          }
        }
      }
      res.status(500).json()
    }
  }
}
