import { UserDBGateway } from 'gateways/databases'
import type { UserRepository } from 'domain/repositories'

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
    await user.comparePasswords(password)
    await this.dbGateway.deleteByEmail(email)
  }
}
