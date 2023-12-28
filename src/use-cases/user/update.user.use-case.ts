import type { UserGateway } from 'domain/gateways'
import type { UserModel } from 'domain/models'

export default class UserUpdateUseCase {
  constructor (private readonly dbGateway: UserGateway) { }

  async exe (
    email: string,
    password: string,
    newEmail?: string,
    newPassword?: string,
    newPasswordConfirmation?: string
  ): Promise<UserModel> {
    const user = await this.dbGateway.getByEmail(email)
    await user.update(
      newEmail,
      newPassword,
      newPasswordConfirmation,
      password
    )
    await this.dbGateway.update(email, user)
    return user
  }
}
