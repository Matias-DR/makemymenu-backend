import type { UserRepository } from 'domain/repositories'
import { UserUpdateUseCase } from 'use-cases/user'
import type { UnsuccessfullResponse } from 'controllers/definitions'
import { SessionModel } from 'domain/models'
import { UserDBGateway } from 'gateways/databases'

export default class UserUpdateController {
  private readonly dbGateway: UserDBGateway

  constructor (Repository: new () => UserRepository) {
    this.dbGateway = new UserDBGateway(Repository)
  }

  async exe (
    headers: any,
    body: any,
    error: UnsuccessfullResponse,
    next: () => void
  ): Promise<void> {
    try {
      const refreshToken = SessionModel.extractTokenFromHeaders(headers)
      const email = SessionModel.decode(refreshToken)
      const password = body.password
      const newEmail = body.newEmail ?? undefined
      const newPassword = body.newPassword ?? undefined
      const newPasswordConfirmation = body.newPasswordConfirmation ?? undefined
      const useCase = new UserUpdateUseCase(this.dbGateway)
      const user = await useCase.exe(
        email,
        password,
        newEmail,
        newPassword,
        newPasswordConfirmation
      )
      body.user = user.toJSON()
      next()
    } catch (err: any) {
      error(err)
    }
  }
}
