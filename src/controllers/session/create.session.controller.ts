import { SessionCreateUseCase } from 'use-cases/session'
import type {
  SuccessfullResponse,
  UnsuccessfullResponse
} from 'controllers/definitions'
import { SessionDBGateway } from 'gateways/databases'
import type { SessionRepository } from 'domain/repositories'

export default class SessionCreateController {
  private readonly dbGateway: SessionDBGateway

  constructor (Repository: new () => SessionRepository) {
    this.dbGateway = new SessionDBGateway(Repository)
  }

  public async exe (
    body: any,
    success: SuccessfullResponse,
    error: UnsuccessfullResponse
  ): Promise<void> {
    const email = body.email
    try {
      const useCase = new SessionCreateUseCase(this.dbGateway)
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
