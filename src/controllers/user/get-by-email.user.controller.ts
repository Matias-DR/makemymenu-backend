import type { UserRepository } from 'domain/repositories'
import { UserGetByEmailUseCase } from 'use-cases/user'
import type {
  SuccessfullResponse,
  UnsuccessfullResponse
} from 'controllers/definitions'
import { SessionModel } from 'domain/models'
import { UserDBGateway } from 'gateways/databases'

export default class UserGetByEmailController {
  private readonly dbGateway: UserDBGateway

  constructor (Repository: new () => UserRepository) {
    this.dbGateway = new UserDBGateway(Repository)
  }

  async exe (
    headers: any,
    success: SuccessfullResponse,
    error: UnsuccessfullResponse
  ): Promise<void> {
    try {
      const accessToken = SessionModel.extractTokenFromHeaders(headers)
      const email = SessionModel.decode(accessToken)
      const useCase = new UserGetByEmailUseCase(this.dbGateway)
      const result = await useCase.exe(email)
      success(
        200,
        result
      )
    } catch (err: any) {
      error(err)
    }
  }
}
