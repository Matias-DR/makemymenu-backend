import {
  EmailField,
  PasswordField
} from 'domain/fields'
import { AlreadyExistOperationException } from 'domain/exceptions/operation.exceptions'
import {
  type AuthRepository,
  type UserRepository
} from 'domain/repositories'
import { UserServices } from 'services'
import {
  compare,
  hash
} from 'bcrypt'
import { WrongPasswordFieldException } from 'domain/exceptions/fields/password.field.exceptions'
import {
  createRefreshToken,
  createAccessToken
} from 'lib/token.lib'

export default class AuthUseCases {
  private readonly services: UserServices

  constructor (
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository
  ) {
    this.services = new UserServices(this.userRepository)
  }

  async signUp (input: {
    email: string
    password: string
    passwordConfirmation: string
  }): Promise<void> {
    const email = new EmailField(input.email)
    const password = new PasswordField(input.password)

    password.passwordConfirmMatchTest(input.passwordConfirmation)

    if (await this.services.existByEmail(email.value)) {
      throw new AlreadyExistOperationException()
    }

    const hashedPassword = await hash(password.value, 10)

    const form = {
      email: email.value,
      password: hashedPassword
    }

    await this.authRepository.signUp(form)
  }

  async signIn (input: {
    email: string
    password: string
  }): Promise<any> {
    const email = new EmailField(input.email)
    let password = null
    try {
      password = new PasswordField(input.password)
    } catch {
      throw new WrongPasswordFieldException()
    }

    const user = await this.services.getByEmail(email.value)

    if (!await compare(password.value, user.password)) {
      throw new WrongPasswordFieldException()
    }

    const dataToTokenize = {
      id: user.id,
      email: user.email
    }
    const refreshToken = createRefreshToken(dataToTokenize)
    const accessToken = createAccessToken(dataToTokenize)

    const tokens = {
      refreshToken,
      accessToken
    }

    await this.authRepository.signIn(tokens)

    return tokens
  }
}
