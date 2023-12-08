import type { UserEntity } from 'domain/entities'
import { type AuthRepository } from 'domain/repositories'
import { AuthSignInUseCase } from 'application/use-cases/auth'

export default class AuthAccessTokenRenewalController {
  constructor (
    private readonly repository: AuthRepository,
    private readonly data: any
  ) { }

  async execute (): Promise<UserEntity> {
    const useCase = new AuthSignInUseCase(this.repository)

    const form = {
      email: this.data.email,
      password: this.data.password
    }

    const res = await useCase.execute(form)
    return res
  }
}
