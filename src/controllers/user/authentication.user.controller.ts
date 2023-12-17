import type { UserRepository } from 'domain/repositories'
import { UserAuthenticationUseCase } from 'use-cases/user'
import type { UnsuccessfullResponse } from 'controllers/definitions'

export default class UserAuthenticationController {
  constructor (private readonly repository: UserRepository) { }

  async exe (
    body: any,
    error: UnsuccessfullResponse,
    next: () => void
  ): Promise<void> {
    try {
      const email = body.email
      const password = body.password
      const useCase = new UserAuthenticationUseCase(this.repository)
      await useCase.exe(
        email,
        password
      )
      next()
    } catch (err: any) {
      error(err)
    }
  }
}
