import type { UserEntity } from 'domain/entities'
import { type UserRepository } from 'domain/repositories'
import { UserGetByEmailService } from 'application/services/user'

export default class UserGetByEmailController {
  constructor (
    private readonly repository: UserRepository,
    private readonly data: any
  ) { }

  async exe (): Promise<UserEntity> {
    const userGetByEmailService = new UserGetByEmailService(this.repository)
    const res = await userGetByEmailService.exe(this.data.email)
    return res
  }
}
