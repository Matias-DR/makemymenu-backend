import { UserModel } from 'domain/models'
import { AlreadyExistOperationException } from 'domain/exceptions/operation.exceptions'
import {
  PasswordConfirmationRequiredUserException,
  WrongPasswordConfirmationUserException
} from 'domain/exceptions/user.exceptions'
import type { UserRepository } from 'domain/repositories'
import { UserDBGateway } from 'gateways/databases'

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
    if (await this.dbGateway.existByEmail(user.email)) {
      throw new AlreadyExistOperationException()
    }
    await user.encryptPassword()
    if (user.isEmpty(passwordConfirmation)) {
      throw new PasswordConfirmationRequiredUserException()
    }
    if (!await user.comparePasswords(passwordConfirmation)) {
      throw new WrongPasswordConfirmationUserException()
    }
    await this.dbGateway.create(user)
  }
}
