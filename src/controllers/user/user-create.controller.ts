import type { UserEntity } from 'domain/entities'
import { type UserRepository } from 'domain/repositories'
import { UserCreateUseCase } from 'application/use-cases/user'

export default class UserCreateController {
  constructor (
    private readonly repository: UserRepository,
    private readonly data: any
  ) { }

  async exe (): Promise<UserEntity> {
    const form = {
      email: this.data.email,
      password: this.data.password,
      passwordConfirmation: this.data.passwordConfirmation
    }
    const useCase = new UserCreateUseCase(this.repository)
    const res = await useCase.exe(form)
    return res
  }
}
