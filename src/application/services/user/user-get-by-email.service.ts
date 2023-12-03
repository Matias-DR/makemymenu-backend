import { type UserEntity } from 'domain/entities'
import { type UserRepository } from 'domain/repositories'
import { NotFoundOperationException } from 'domain/exceptions/operation.exceptions'

export default class UserGetByEmailService {
  constructor (private readonly userRepository: UserRepository) {}

  async exe (email: string): Promise<UserEntity> {
    const res = await this.userRepository.getByEmail(email)
    if (res !== null && res !== undefined) {
      return res
    }
    throw new NotFoundOperationException()
  }
}
