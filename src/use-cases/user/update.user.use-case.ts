import { UserDBGateway } from 'gateways/databases'
import type { UserRepository } from 'domain/repositories'

export default class UserUpdateUseCase {
  private readonly dbGateway: UserDBGateway

  constructor (private readonly repository: UserRepository) {
    this.dbGateway = new UserDBGateway(this.repository)
  }

  async exe (
    email: string,
    password: string,
    newEmail?: string,
    newPassword?: string,
    newPasswordConfirmation?: string
  ): Promise<void> {
    const user = await this.dbGateway.getByEmail(email)
    await user.update(
      newEmail,
      newPassword,
      newPasswordConfirmation,
      password
    )
    await this.dbGateway.update(user)
  }
}
