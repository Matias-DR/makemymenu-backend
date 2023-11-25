import type { UserEntity } from 'domain/entities'
import { type UserRepository } from 'domain/repositories'
import { UserSignInUseCase } from 'application/use-cases/user'

export default class UserSignInController {
  constructor (
    private readonly repository: UserRepository,
    private readonly data: any
  ) { }

  async exe (): Promise<UserEntity> {
    const useCase = new UserSignInUseCase(this.repository)

    const form = {
      email: this.data.email,
      password: this.data.password
    }

    const res = await useCase.exe(form)
    return res
  }
}
