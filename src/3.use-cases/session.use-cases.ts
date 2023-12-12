import type { SessionEntity } from '0.domain/entities'
import {
  AccessField,
  RefreshField
} from '0.domain/fields/session'
import type { SessionRepository } from '0.domain/repositories'
import { SessionServices } from '2.services'

export default class SessionUseCases {
  private readonly services: SessionServices

  constructor (private readonly repository: SessionRepository) {
    this.services = new SessionServices(this.repository)
  }

  async delete (access: AccessField): Promise<void> {
    await this.services.existByAccessToken(access)
    await this.repository.delete(access.value)
  }

  async create (input: {
    id: string
    email: string
  }): Promise<SessionEntity> {
    const refreshToken = new RefreshField(input)
    const accessToken = new AccessField(input)
    const tokens = {
      refreshToken: refreshToken.value,
      accessToken: accessToken.value
    }
    await this.services.existByRefreshToken(refreshToken)
    return await this.repository.create(tokens)
  }

  async updateAccessToken (token: string): Promise<string> {
    const access = AccessField.constructFromToken(token)
    await this.services.existByAccessToken(access)
    const decoded = access.decode()
    const data = {
      id: decoded.id,
      email: decoded.email
    }
    const newAccessToken = new AccessField(data)
    await this.repository.updateAccessToken(
      token,
      newAccessToken.value
    )
    return newAccessToken.value
  }
}
