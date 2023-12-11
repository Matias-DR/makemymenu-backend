import {
  EmailField,
  PasswordField
} from '0.domain/fields'
import { AlreadyExistOperationException } from '0.domain/exceptions/operation.exceptions'
import {
  type AuthRepository,
  type UserRepository
} from '0.domain/repositories'
import { UserServices } from '2.services'
import {
  compare,
  hash
} from 'bcrypt'
import { WrongPasswordFieldException } from '0.domain/exceptions/fields/password.field.exceptions'
import type { UserEntity } from '0.domain/entities'

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
  }): Promise<UserEntity> {
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

    return user
  }
}
