import type { SessionRepository } from 'domain/repositories'
import { SessionUpdateByRefreshTokenUseCase } from 'use-cases/session'
import type {
  SuccessfullResponse,
  UnsuccessfullResponse
} from 'controllers/definitions'
import { SessionModel } from 'domain/models'
import { SessionDBGateway } from 'gateways/databases'

export default class SessionUpdateByRefreshTokenController {
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
      const refreshToken = SessionModel.extractTokenFromHeaders(headers)
      const useCase = new SessionUpdateByRefreshTokenUseCase(this.dbGateway)
      const session = await useCase.exe(refreshToken)
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
