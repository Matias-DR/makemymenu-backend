import { Exception } from '0.domain/exceptions/exception'
import { AccessField } from '0.domain/fields/session'
import type { UserRepository } from '0.domain/repositories'
import { UserServices } from '2.services'
import { UserUseCases } from '3.use-cases'

export default class UserController {
  private readonly repository: UserRepository
  private readonly services: UserServices
  private readonly useCases: UserUseCases

  constructor (Repository: new () => UserRepository) {
    this.repository = new Repository()
    this.useCases = new UserUseCases(this.repository)
    this.services = new UserServices(this.repository)
  }

  async signIn (
    req: any,
    res: any,
    next: () => void
  ): Promise<void> {
    const input = {
      email: req.body.email,
      password: req.body.password
    }
    try {
      const result = await this.useCases.signIn(input)
      req.body = result
      next()
    } catch (error: any) {
      if (error instanceof Exception) {
        res.status(error.code).json(error.spanishMessage)
      } else {
        res.status(500).json()
      }
    }
  }

  async create (
    req: any,
    res: any
  ): Promise<void> {
    const input = {
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    }
    try {
      await this.useCases.create(input)
      res.status(200).json()
    } catch (error: any) {
      if (error instanceof Exception) {
        res.status(error.code).json(error.spanishMessage)
      } else {
        res.status(500).json()
      }
    }
  }

  async update (
    req: any,
    res: any,
    next: () => void
  ): Promise<void> {
    const token = AccessField.getTokenFromHeader(req.headers)
    let access: AccessField
    try {
      access = AccessField.constructFromToken(token)
      const decoded = access.decode()
      const input = {
        id: decoded.id,
        email: decoded.email,
        ...req.body
      }
      try {
        const result = await this.useCases.update(input)
        req.body = result
        next()
      } catch (error: any) {
        if (error instanceof Exception) {
          res.status(error.code).json(error.spanishMessage)
        } else {
          res.status(500).json()
        }
      }
    } catch (error: any) {
      if (error instanceof Exception) {
        res.status(error.code).json(error.spanishMessage)
      } else {
        res.status(500).json()
      }
    }
  }

  async delete (
    req: any,
    res: any,
    next: () => void
  ): Promise<void> {
    const token = AccessField.getTokenFromHeader(req.headers)
    const access = AccessField.constructFromToken(token)
    const { id } = access.decode()
    try {
      await this.useCases.deleteById(id)
      next()
    } catch (error: any) {
      if (error instanceof Exception) {
        res.status(error.code).json(error.spanishMessage)
      } else {
        res.status(500).json()
      }
    }
  }
}
