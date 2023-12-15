import type { UserEntity } from 'domain/entities'
import { NotFoundOperationException } from 'domain/exceptions/operation.exceptions'
import type { UserRepository } from 'domain/repositories'

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
