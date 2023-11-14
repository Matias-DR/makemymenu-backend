import type { UserEntity } from 'domain/entities'
import { type UserRepository } from 'domain/repositories'
import { UserUpdateUseCase } from 'application/use-cases/user'

export default class UserUpdateController {
  constructor (
    private readonly repository: UserRepository,
    private readonly data: any
  ) { }

  async exe (): Promise<UserEntity> {
    const form = {
      id: this.data.id,
      email: this.data.email,
      password: this.data.password,
      newEmail: this.data.newEmail,
      newPassword: this.data.newPassword,
      newPasswordConfirmation: this.data.newPasswordConfirmation
    }

    const userUpdateUseCase = new UserUpdateUseCase(this.repository)
    const res = await userUpdateUseCase.exe(form)
    return res
  }
}
