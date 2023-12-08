import type {
  UserRepository,
  AuthRepository
} from 'domain/repositories'
import { AuthUseCases } from 'use-cases'
import type { AuthAdapter } from 'adapters'

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

    const result = this.useCases.signUp(input)

    await result
  }

  async signIn (data: any): Promise<{
    accessToken: string
    refreshToken: string
  }> {
    const input = {
      email: data.email,
      password: data.password
    }

    const result = await this.useCases.signIn(input)

    const output = {
      accessToken: result.accessToken.token,
      refreshToken: result.refreshToken.token
    }

    return output
  }
}
