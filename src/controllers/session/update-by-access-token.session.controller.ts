import type { SessionRepository } from 'domain/repositories'
import { SessionUpdateByAccessTokenUseCase } from 'use-cases/session'
import type {
  SuccessfullResponse,
  UnsuccessfullResponse
} from 'controllers/definitions'
import { SessionModel } from 'domain/models'
import { SessionDBGateway } from 'gateways/databases'

export default class SessionUpdateController {
  private readonly dbGateway: SessionDBGateway

  constructor (Repository: new () => SessionRepository) {
    this.dbGateway = new SessionDBGateway(Repository)
  }

  public async exe (
    headers: any,
    success: SuccessfullResponse,
    error: UnsuccessfullResponse
  ): Promise<void> {
    try {
      const accessToken = SessionModel.extractTokenFromHeaders(headers)
      const useCase = new SessionUpdateByAccessTokenUseCase(this.dbGateway)
      const session = await useCase.exe(accessToken)
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
