import type { UserEntity } from 'domain/entities'
import { type AuthRepository } from 'domain/repositories'
import { AuthCreateTokenService } from 'application/services/auth'

export default class AuthRefreshTokenRenewalController {
  constructor (
    private readonly repository: AuthRepository,
    private readonly data: any
  ) { }

  async execute (): Promise<UserEntity> {
    const useCase = new AuthCreateTokenService(this.repository)

    const res = await useCase.execute()
    return res
  }
}
