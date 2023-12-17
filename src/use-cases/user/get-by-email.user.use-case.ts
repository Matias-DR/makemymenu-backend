import type { UserModel } from 'domain/models'
import { UserDBGateway } from 'gateways/databases'
import type { UserRepository } from 'domain/repositories'

export default class UserGetByEmailUseCase {
  private readonly dbGateway: UserDBGateway

  constructor (private readonly repository: UserRepository) {
    this.dbGateway = new UserDBGateway(this.repository)
  }

  async exe (email: string): Promise<UserModel> {
    const user = await this.dbGateway.getByEmail(email)
    return user
  }
}
