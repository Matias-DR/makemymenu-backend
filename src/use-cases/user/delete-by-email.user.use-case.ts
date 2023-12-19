import type { UserGateway } from 'domain/gateways'
import { WrongPasswordUserException } from 'domain/exceptions/user.exceptions'

export default class UserDeleteByEmailUseCase {
  constructor (private readonly dbGateway: UserGateway) { }

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
