import type { UserRepository } from 'domain/repositories'
import { decodeToken, extractTokenFromHeaders } from 'utils/token.util'
import { UserUseCases } from 'use-cases'

export default class UserController {
  private readonly repository: UserRepository
  private readonly useCases: UserUseCases

  constructor (Repository: new () => UserRepository) {
    this.repository = new Repository()
    this.useCases = new UserUseCases(this.repository)
  }

  async signIn (req: any): Promise<void> {
    const input = {
      email: req.body.email,
      password: req.body.password
    }
    const result = await this.useCases.signIn(input)
    req.body = result
  }

  async create (req: any): Promise<void> {
    const input = {
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    }
    await this.useCases.create(input)
  }

  async update (req: any): Promise<void> {
    const access = extractTokenFromHeaders(req.headers)
    const decoded = decodeToken(access)
    const input = {
      id: decoded.id,
      email: decoded.email,
      ...req.body
    }
    const result = await this.useCases.update(input)
    req.body = result
  }

  async delete (req: any): Promise<void> {
    const access = extractTokenFromHeaders(req.headers)
    const decoded = decodeToken(access)
    const input = {
      id: decoded.id,
      password: req.body.password
    }
    await this.useCases.deleteById(input)
  }
}
