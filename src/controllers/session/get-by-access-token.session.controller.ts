import type { SessionRepository } from 'domain/repositories'
import { SessionGetByTokenController } from './'
import { SessionGetByAccessTokenUseCase } from 'use-cases/session'
import type {
  SuccessfullResponse,
  UnsuccessfullResponse
} from 'controllers/definitions'

export default class SessionGetByAccessTokenController extends SessionGetByTokenController {
  constructor (repository: SessionRepository) {
    super(
      repository,
      SessionGetByAccessTokenUseCase
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
