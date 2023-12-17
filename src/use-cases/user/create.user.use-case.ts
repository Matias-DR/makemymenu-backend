import { UserModel } from 'domain/models'
import { AlreadyExistOperationException } from 'domain/exceptions/operation.exceptions'
import { UserDBGateway } from 'gateways/databases'
import type { UserRepository } from 'domain/repositories'

export default class UserCreateUseCase {
  private readonly dbGateway: UserDBGateway

  constructor (private readonly repository: UserRepository) {
    this.dbGateway = new UserDBGateway(this.repository)
  }

  async exe (
    email: string,
    password: string,
    passwordConfirmation: string
  ): Promise<void> {
    const user = new UserModel(email, password)
    user.test()
    user.compareEmails(passwordConfirmation)
    if (await this.dbGateway.existByEmail(user.email)) {
      throw new AlreadyExistOperationException()
    }
    await user.encryptPassword()
    await this.dbGateway.create(user)
  }
}
