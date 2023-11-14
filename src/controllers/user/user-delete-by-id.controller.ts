import type { UserEntity } from 'domain/entities'
import { type UserRepository } from 'domain/repositories'
import { UserDeleteUseCase } from 'application/use-cases/user'

export default class UserDeleteByIdController {
  constructor (
    private readonly repository: UserRepository,
    private readonly data: any
  ) { }

  async exe (): Promise<UserEntity> {
    const userDeleteUseCase = new UserDeleteUseCase(this.repository)

    const form = {
      id: this.data.id,
      password: this.data.password
    }

    const res = await userDeleteUseCase.exe(form)
    return res
  }
}
