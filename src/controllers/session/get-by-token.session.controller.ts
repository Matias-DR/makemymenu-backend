import type { SessionRepository } from 'domain/repositories'
import { SessionModel } from 'domain/models'
import type {
  SessionGetByRefreshTokenUseCase,
  SessionGetByAccessTokenUseCase
} from 'use-cases/session'
import type {
  SuccessfullResponse,
  UnsuccessfullResponse
} from 'controllers/definitions'
import type { SessionGateway } from 'domain/gateways'
import { SessionDBGateway } from 'gateways/databases'

export default class SessionGetByTokenController {
  protected readonly useCase:
  SessionGetByRefreshTokenUseCase | SessionGetByAccessTokenUseCase

  constructor (
    Repository: new () => SessionRepository,
    UseCase: new (dbGateway: SessionGateway) =>
    SessionGetByRefreshTokenUseCase | SessionGetByAccessTokenUseCase
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
      const result = await this.useCase.exe(token)
      success(
        200,
        result
      )
    } catch (err: any) {
      error(
        err
      )
    }
  }
}
