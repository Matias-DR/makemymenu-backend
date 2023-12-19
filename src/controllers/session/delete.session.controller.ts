import type { SessionRepository } from 'domain/repositories'
import { SessionModel } from 'domain/models'
import type {
  SessionDeleteByRefreshTokenUseCase,
  SessionDeleteByAccessTokenUseCase
} from 'use-cases/session'
import type {
  SuccessfullResponse,
  UnsuccessfullResponse
} from 'controllers/definitions'
import { SessionDBGateway } from 'gateways/databases'
import type { SessionGateway } from 'domain/gateways'

export default class SessionDeleteController {
  protected readonly useCase:
  SessionDeleteByRefreshTokenUseCase | SessionDeleteByAccessTokenUseCase

  constructor (
    Repository: new () => SessionRepository,
    UseCase: new (dbGateway: SessionGateway) =>
    SessionDeleteByRefreshTokenUseCase | SessionDeleteByAccessTokenUseCase
  ) {
    const gbGateway = new SessionDBGateway(Repository)
    this.useCase = new UseCase(gbGateway)
  }

  protected async exe (
    headers: any,
    success: SuccessfullResponse,
    error: UnsuccessfullResponse
  ): Promise<void> {
    try {
      const token = SessionModel.extractTokenFromHeaders(headers)
      await this.useCase.exe(token)
      success(200)
    } catch (err: any) {
      error(
        err
      )
    }
  }
}
