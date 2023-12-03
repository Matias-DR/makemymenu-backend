import type { UserEntity } from 'domain/entities'
import {
  type AuthRepository,
  type UserRepository
} from 'domain/repositories'
import { AuthSignUpUseCase } from 'application/use-cases/auth'

export default class AuthSignUpController {
  constructor (
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly data: any
  ) { }

  async exe (): Promise<UserEntity> {
    const form = {
      email: this.data.email,
      password: this.data.password,
      passwordConfirmation: this.data.passwordConfirmation
    }
    const useCase = new AuthSignUpUseCase(
      this.authRepository,
      this.userRepository
    )
    const res = await useCase.exe(form)
    return res
  }
}
