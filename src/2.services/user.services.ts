import type { UserEntity } from '0.domain/entities'
import { NotFoundOperationException } from '0.domain/exceptions/operation.exceptions'
import type { UserRepository } from '0.domain/repositories'

export default class UserServices {
  constructor (private readonly repository: UserRepository) { }

  async getByEmail (email: string): Promise<UserEntity> {
    const res = await this.repository.getByEmail(email)
    if (res !== null && res !== undefined) {
      return res
    }
    throw new NotFoundOperationException()
  }

  async existByEmail (email: string): Promise<boolean> {
    try {
      const res = await this.repository.getByEmail(email)
      return res !== null || res !== undefined
    } catch (error) {
      return false
    }
  }
}
