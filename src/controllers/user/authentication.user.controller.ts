import { UserAuthenticationUseCase } from 'use-cases/user'
import type { UnsuccessfullResponse } from 'controllers/definitions'
import type { UserRepository } from 'domain/repositories'
import { UserDBGateway } from 'gateways/databases'

export default class UserAuthenticationController {
  private readonly dbGateway: UserDBGateway

  constructor (Repository: new () => UserRepository) {
    this.dbGateway = new UserDBGateway(Repository)
  }

  async exe (
    body: any,
    error: UnsuccessfullResponse,
    next: () => void
  ): Promise<void> {
    try {
      const email = body.email
      const password = body.password
      const useCase = new UserAuthenticationUseCase(this.dbGateway)
      await useCase.exe(
        email,
        password
      )
      next()
    } catch (err: any) {
      error(err)
    }
  }
}
