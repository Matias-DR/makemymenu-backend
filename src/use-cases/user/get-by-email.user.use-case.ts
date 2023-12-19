import type { UserModel } from 'domain/models'
import type { UserGateway } from 'domain/gateways'

export default class UserGetByEmailUseCase {
  constructor (private readonly dbGateway: UserGateway) { }

  async exe (email: string): Promise<UserModel> {
    const user = await this.dbGateway.getByEmail(email)
    return user
  }
}
