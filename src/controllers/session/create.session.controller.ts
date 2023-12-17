import type { SessionRepository } from 'domain/repositories'
import { SessionCreateUseCase } from 'use-cases/session'
import type {
  SuccessfullResponse,
  UnsuccessfullResponse
} from 'controllers/definitions'

export default class SessionCreateController {
  constructor (private readonly repository: SessionRepository) { }

  public async exe (
    body: any,
    success: SuccessfullResponse,
    error: UnsuccessfullResponse
  ): Promise<void> {
    const email = body.email
    try {
      const useCase = new SessionCreateUseCase(this.repository)
      const result = await useCase.exe(email)
      success(
        201,
        result.toJSON()
      )
    } catch (err: any) {
      error(
        err
      )
    }
  }
}
