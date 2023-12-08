import type { SessionRepository } from 'domain/repositories'
import { Controller } from '.'
import type { SessionAdapter } from 'adapters'

export default class SessionController extends Controller {
  private readonly repository: SessionRepository
  private readonly adapter: SessionAdapter

  constructor (
    Repository: new () => SessionRepository,
    Adapter: new (repository: SessionRepository) => SessionAdapter
  ) {
    super()
    this.repository = new Repository()
    this.adapter = new Adapter(
      this.repository
    )
  }

  async updateTokens (
    req: any,
    res: any
  ): Promise<void> {
    await this.resolve(
      this.adapter.updateTokens,
      req.body,
      res
    )
  }

  async updateAccessToken (
    req: any,
    res: any
  ): Promise<void> {
    await this.resolve(
      this.adapter.updateAccessToken,
      req.body,
      res
    )
  }
}
