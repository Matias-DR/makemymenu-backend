import type { SessionRepository } from 'domain/repositories'
import { SessionUpdateAfterUserUpdateUseCase } from 'use-cases/session'
import type {
  SuccessfullResponse,
  UnsuccessfullResponse
} from 'controllers/definitions'
import { SessionModel, UserModel } from 'domain/models'
import { SessionDBGateway } from 'gateways/databases'

export default class SessionUpdateAfterUserUpdateController {
  private readonly dbGateway: SessionDBGateway

  constructor (Repository: new () => SessionRepository) {
    this.dbGateway = new SessionDBGateway(Repository)
  }

  public async exe (
    headers: any,
    body: any,
    success: SuccessfullResponse,
    error: UnsuccessfullResponse
  ): Promise<void> {
    try {
      const accessToken = SessionModel.extractTokenFromHeaders(headers)
      const user = new UserModel(body.user)
      const useCase = new SessionUpdateAfterUserUpdateUseCase(this.dbGateway)
      const session = await useCase.exe(accessToken, user)
      success(
        200,
        session.toJSON()
      )
    } catch (err: any) {
      error(
        err
      )
    }
  }
}
