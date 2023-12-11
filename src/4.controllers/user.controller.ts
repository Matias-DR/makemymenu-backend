import type { UserRepository } from '0.domain/repositories'
import type { UserAdapter } from '5.adapters'
import { decodeToken, parseToken } from '1.lib/token.lib'

export default class UserController {
  private readonly adapter: UserAdapter
  private readonly repository: UserRepository

  constructor (
    Repository: new () => UserRepository,
    Adapter: new (repository: UserRepository) => UserAdapter
  ) {
    this.repository = new Repository()
    this.adapter = new Adapter(this.repository)
  }

  async update (
    req: any,
    res: any,
    next: () => void
  ): Promise<void> {
    const token = parseToken(req)
    const decodedToken = decodeToken(token)
    const input = {
      id: decodedToken.id,
      email: decodedToken.email,
      ...req.body
    }
    try {
      const result = await this.adapter.update(input)
      req.body = result
      next()
      // res.status(200).json(result)
    } catch (error: any) {
      res.status(error.code).json(error.spanishMessage)
    }
  }

  async getByEmail (
    req: any,
    res: any
  ): Promise<void> {
    try {
      const result = await this.adapter.getByEmail(req.params)
      res.status(200).json(result)
    } catch (error: any) {
      res.status(error.code).json(error.spanishMessage)
    }
  }

  async deleteById (
    req: any,
    res: any
  ): Promise<void> {
    try {
      await this.adapter.deleteById(req.params)
      res.status(200)
    } catch (error: any) {
      res.status(error.code).json(error.spanishMessage)
    }
  }
}
