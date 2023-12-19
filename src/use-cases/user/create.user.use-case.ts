import { UserModel } from 'domain/models'
import { AlreadyExistOperationException } from 'domain/exceptions/operation.exceptions'
import {
  PasswordConfirmationRequiredUserException,
  WrongPasswordConfirmationUserException
} from 'domain/exceptions/user.exceptions'
import type { UserGateway } from 'domain/gateways'

export default class UserCreateUseCase {
  constructor (private readonly dbGateway: UserGateway) {}

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
