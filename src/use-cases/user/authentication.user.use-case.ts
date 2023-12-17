import { UserModel } from 'domain/models'
import type { UserRepository } from 'domain/repositories'
import { WrongPasswordUserException } from 'domain/exceptions/user.exceptions'
import { NotFoundOperationException } from 'domain/exceptions/operation.exceptions'
import { UserDBGateway } from 'gateways/databases'

export default class UserAuthenticationUseCase {
  private readonly dbGateway: UserDBGateway

  constructor (private readonly repository: UserRepository) {
    this.dbGateway = new UserDBGateway(this.repository)
  }

  async exe (
    email: string,
    password: string
  ): Promise<void> {
    let user = new UserModel(email, password)
    user.test()
    if (!await this.dbGateway.existByEmail(email)) {
      throw new NotFoundOperationException()
    }
    user = await this.dbGateway.getByEmail(email)
    if (!await user.comparePasswords(password)) {
      throw new WrongPasswordUserException()
    }
  }
}
