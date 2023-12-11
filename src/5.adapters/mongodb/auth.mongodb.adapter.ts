import type {
  UserRepository,
  AuthRepository
} from '0.domain/repositories'
import { AuthUseCases } from '3.use-cases'
import type { AuthAdapter } from '5.adapters'
import type { UserEntity } from '0.domain/entities'

export default class AuthMongoDBAdapter implements AuthAdapter {
  private readonly useCases: AuthUseCases

  constructor (
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository
  ) {
    this.useCases = new AuthUseCases(
      this.authRepository,
      this.userRepository
    )
  }

  async signUp (data: any): Promise<void> {
    const input = {
      email: data.email,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation
    }
    await this.useCases.signUp(input)
  }

  async signIn (data: any): Promise<UserEntity> {
    const input = {
      email: data.email,
      password: data.password
    }

    const result = await this.useCases.signIn(input)

    return result
  }
}
