import { UserModel } from 'domain/models'
import { WrongPasswordUserException } from 'domain/exceptions/user.exceptions'
import { NotFoundOperationException } from 'domain/exceptions/operation.exceptions'
import type { UserGateway } from 'domain/gateways'

export default class UserAuthenticationUseCase {
  constructor (private readonly dbGateway: UserGateway) { }

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
