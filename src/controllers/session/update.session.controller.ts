import type { SessionRepository } from 'domain/repositories'
import { SessionUpdateUseCase } from 'use-cases/session'
import type {
  SuccessfullResponse,
  UnsuccessfullResponse
} from 'controllers/definitions'
import { SessionModel } from 'domain/models'

export default class SessionUpdateController {
  constructor (private readonly repository: SessionRepository) { }

  public async exe (
    headers: any,
    success: SuccessfullResponse,
    error: UnsuccessfullResponse
  ): Promise<void> {
    try {
      const refreshToken = SessionModel.extractTokenFromHeaders(headers)
      const useCase = new SessionUpdateUseCase(this.repository)
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
