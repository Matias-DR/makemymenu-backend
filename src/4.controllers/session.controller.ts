import type { SessionRepository } from '0.domain/repositories'
import type { SessionAdapter } from '5.adapters'
import {
  parseToken,
  verifyToken,
  createAccessToken,
  createRefreshToken
} from '1.lib/token.lib'

export default class SessionController {
  private readonly repository: SessionRepository
  private readonly adapter: SessionAdapter

  constructor (
    Repository: new () => SessionRepository,
    Adapter: new (repository: SessionRepository) => SessionAdapter
  ) {
    this.repository = new Repository()
    this.adapter = new Adapter(
      this.repository
    )
  }

  async updateSession (
    req: any,
    res: any
  ): Promise<void> {
    const token = parseToken(req)
    const user = {
      id: req.body.id,
      email: req.body.email
    }
    try {
      const result = await this.adapter.updateSession(
        token,
        user
      )
      res.status(200).json(result)
    } catch (error: any) {
      res.status(error.code).json(error.spanishMessage)
    }
  }

  async updateTokens (
    req: any,
    res: any
  ): Promise<void> {
    const token = parseToken(req)
    try {
      verifyToken(token)
      const result = await this.adapter.updateTokens(token)
      res.status(200).json(result)
    } catch (error: any) {
      res.status(error.code).json(error.spanishMessage)
    }
  }

  async updateAccessToken (
    req: any,
    res: any
  ): Promise<void> {
    const token = parseToken(req)
    try {
      verifyToken(token)
      const result = await this.adapter.updateAccessToken(req.body)
      res.status(200).json(result)
    } catch (error: any) {
      res.status(error.code).json(error.spanishMessage)
    }
  }
}
