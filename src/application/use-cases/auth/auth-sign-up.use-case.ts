import { type UserEntity } from 'domain/entities'
import {
  EmailField,
  PasswordField
} from 'domain/fields'
import { AlreadyExistOperationException } from 'domain/exceptions/operation.exceptions'
import {
  type AuthRepository,
  type UserRepository
} from 'domain/repositories'
import { type AuthSignUpUseCaseInput } from 'domain/inputs/use-cases/auth'
import { UserExistByEmailService } from 'application/services/user'
import { hash } from 'bcrypt'

export default class AuthSignUpUseCase {
  constructor (
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository
  ) { }

  async exe (input: AuthSignUpUseCaseInput): Promise<UserEntity> {
    const email = new EmailField(input.email)
    const password = new PasswordField(input.password)

    password.passwordConfirmMatchTest(input.passwordConfirmation)

    if (await new UserExistByEmailService(this.userRepository).exe(email.value)) {
      throw new AlreadyExistOperationException()
    }

    const hashedPassword = await hash(password.value, 10)

    const form = {
      email: email.value,
      password: hashedPassword
    }

    const res = await this.authRepository.signUp(form)
    return res
  }
}
