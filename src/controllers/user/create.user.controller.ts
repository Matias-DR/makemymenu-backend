import type { UserRepository } from 'domain/repositories'
import { UserCreateUseCase } from 'use-cases/user'
import type {
  SuccessfullResponse,
  UnsuccessfullResponse
} from 'controllers/definitions'
import { UserDBGateway } from 'gateways/databases'

export default class UserCreateController {
  private readonly dbGateway: UserDBGateway

  constructor (Repository: new () => UserRepository) {
    this.dbGateway = new UserDBGateway(Repository)
  }

  async exe (
    body: any,
    success: SuccessfullResponse,
    error: UnsuccessfullResponse
  ): Promise<void> {
    const email = body.email
    const password = body.password
    const passwordConfirmation = body.passwordConfirmation
    try {
      const useCase = new UserCreateUseCase(this.dbGateway)
      await useCase.exe(
        email,
        password,
        passwordConfirmation
      )
      success(201)
    } catch (err: any) {
      error(err)
    }
  }
}
