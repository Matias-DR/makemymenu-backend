import type { SessionEntity } from '0.domain/entities'
import { NotFoundOperationException, UnsuccessfulOperationException } from '0.domain/exceptions/operation.exceptions'
import type { SessionRepository } from '0.domain/repositories'
import { createAccessToken, createRefreshToken, decodeToken } from '1.utils/token.util'
import { SessionServices } from '2.services'

export default class SessionUseCases {
  private readonly services: SessionServices

  constructor (private readonly repository: SessionRepository) {
    this.services = new SessionServices(this.repository)
  }

  async delete (access: string): Promise<void> {
    await this.services.existByAccessToken(access)
    await this.repository.delete(access)
  }

  async create (input: {
    id: string
    email: string
  }): Promise<SessionEntity> {
    const refreshToken = createRefreshToken(input)
    const accessToken = createAccessToken(input)
    const tokens = {
      refreshToken,
      accessToken
    }
    let exception = new UnsuccessfulOperationException()
    try {
      await this.services.existByRefreshToken(refreshToken)
    } catch (error: any) {
      if (error instanceof NotFoundOperationException) {
        return await this.repository.create(tokens)
      } else {
        exception = error
      }
    }
    throw exception
  }

  async updateAccessToken (accessToken: string): Promise<string> {
    await this.services.existByAccessToken(accessToken)
    const decoded = decodeToken(accessToken)
    const data = {
      id: decoded.id,
      email: decoded.email
    }
    const newAccessToken = createAccessToken(data)
    await this.repository.updateAccessToken(
      accessToken,
      newAccessToken
    )
    return newAccessToken
  }
}
