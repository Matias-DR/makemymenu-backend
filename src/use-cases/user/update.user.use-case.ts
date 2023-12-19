import type { UserGateway } from 'domain/gateways'

export default class UserUpdateUseCase {
  constructor (private readonly dbGateway: UserGateway) { }

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
