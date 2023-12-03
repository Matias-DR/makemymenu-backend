import type { UserEntity } from 'domain/entities'
import { type UserRepository } from 'domain/repositories'
import { AuthSignInUseCase } from 'application/use-cases/auth'

export default class AuthSignInController {
  constructor (
    private readonly repository: UserRepository,
    private readonly data: any
  ) { }

  async exe (): Promise<UserEntity> {
    const useCase = new AuthSignInUseCase(this.repository)

    const form = {
      email: this.data.email,
      password: this.data.password
    }

    const res = await useCase.exe(form)
    return res
  }
}
