import { UserDBGateway } from 'gateways/databases'
import type { UserRepository } from 'domain/repositories'
import { WrongPasswordUserException } from 'domain/exceptions/user.exceptions'

export default class UserDeleteByEmailUseCase {
  private readonly dbGateway: UserDBGateway

  constructor (private readonly repository: UserRepository) {
    this.dbGateway = new UserDBGateway(this.repository)
  }

  async exe (
    email: string,
    password: string
  ): Promise<void> {
    const user = await this.dbGateway.getByEmail(email)
    user.testPassword(password)
    if (!await user.comparePasswords(password)) {
      throw new WrongPasswordUserException()
    }
    await this.dbGateway.deleteByEmail(email)
  }
}
