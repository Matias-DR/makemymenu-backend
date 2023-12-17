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

export default class SessionGetByTokenController {
  protected readonly useCase:
  SessionGetByRefreshTokenUseCase | SessionGetByAccessTokenUseCase

  constructor (
    repository: SessionRepository,
    UseCase: new (repository: SessionRepository) =>
    SessionGetByRefreshTokenUseCase | SessionGetByAccessTokenUseCase
  ) {
    this.useCase = new UseCase(repository)
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
