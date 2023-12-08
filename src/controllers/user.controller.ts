import type { UserRepository } from 'domain/repositories'
import { Controller } from '.'
import type { UserAdapter } from 'adapters'

export default class UserController extends Controller {
  private readonly adapter: UserAdapter
  private readonly repository: UserRepository

  constructor (
    Repository: new () => UserRepository,
    Adapter: new (repository: UserRepository) => UserAdapter
  ) {
    super()
    this.repository = new Repository()
    this.adapter = new Adapter(this.repository)
  }

  async update (
    req: any,
    res: any
  ): Promise<void> {
    await this.resolve(
      this.adapter.update,
      req.body,
      res
    )
  }

  async getByEmail (
    req: any,
    res: any
  ): Promise<void> {
    await this.resolve(
      this.adapter.getByEmail,
      req.params,
      res
    )
  }

  async deleteById (
    req: any,
    res: any
  ): Promise<void> {
    await this.resolve(
      this.adapter.deleteById,
      req.params,
      res
    )
  }
}
