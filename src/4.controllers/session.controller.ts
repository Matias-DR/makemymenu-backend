import { UnsuccessfulOperationException } from '0.domain/exceptions/operation.exceptions'
import { ExpiredTokenException } from '0.domain/exceptions/session.exceptions'
import type { SessionRepository } from '0.domain/repositories'
import { extractTokenFromHeaders, verifyToken } from '1.utils/token.util'
import { SessionUseCases } from '3.use-cases'

export default class SessionController {
  private readonly repository: SessionRepository
  private readonly useCases: SessionUseCases

  constructor (Repository: new () => SessionRepository) {
    this.repository = new Repository()
    this.useCases = new SessionUseCases(this.repository)
  }

  async create (req: any): Promise<{
    access: string
    refresh: string
  }> {
    const data = {
      id: req.body.id,
      email: req.body.email
    }
    const result = await this.useCases.create(data)
    const output = {
      access: result.access,
      refresh: result.refresh
    }
    return output
  }

  async delete (req: any): Promise<void> {
    const accessToken = extractTokenFromHeaders(req.headers)
    await this.useCases.delete(accessToken)
  }

  async updateFromData (req: any): Promise<{
    access: string
    refresh: string
  }> {
    const access = extractTokenFromHeaders(req.headers)
    const data = {
      id: req.body.id,
      email: req.body.email
    }
    await this.useCases.delete(access)
    const result = await this.useCases.create(data)
    const output = {
      access: result.access,
      refresh: result.refresh
    }
    return output
  }

  async updateAccessToken (req: any): Promise<string> {
    const accessToken = extractTokenFromHeaders(req.headers)
    let exception = new UnsuccessfulOperationException()
    try {
      verifyToken(accessToken)
      return accessToken
    } catch (error: any) {
      if (error instanceof ExpiredTokenException) {
        const result = await this.useCases.updateAccessToken(accessToken)
        return result
      } else {
        exception = error
      }
    }
    throw exception
  }
}
