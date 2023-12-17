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

export default class SessionDeleteController {
  protected readonly useCase:
  SessionDeleteByRefreshTokenUseCase | SessionDeleteByAccessTokenUseCase

  constructor (
    repository: SessionRepository,
    UseCase: new (repository: SessionRepository) =>
    SessionDeleteByRefreshTokenUseCase | SessionDeleteByAccessTokenUseCase
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
      await this.useCase.exe(token)
      success(200)
    } catch (err: any) {
      error(
        err
      )
    }
  }
}
