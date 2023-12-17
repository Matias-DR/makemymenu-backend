import type { SessionRepository } from 'domain/repositories'
import { SessionDeleteController } from '.'
import { SessionDeleteByAccessTokenUseCase } from 'use-cases/session'
import type {
  SuccessfullResponse,
  UnsuccessfullResponse
} from 'controllers/definitions'

export default class SessionDeleteByAccessTokenController extends SessionDeleteController {
  constructor (repository: SessionRepository) {
    super(
      repository,
      SessionDeleteByAccessTokenUseCase
    )
  }

  public async exe (
    headers: any,
    success: SuccessfullResponse,
    error: UnsuccessfullResponse
  ): Promise<void> {
    await super.exe(
      headers,
      success,
      error
    )
  }
}
