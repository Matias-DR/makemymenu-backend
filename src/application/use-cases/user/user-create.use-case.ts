import { type UserEntity } from 'domain/entities'
import {
  EmailField,
  PasswordField
} from 'domain/fields'
import { AlreadyExistOperationException } from 'domain/exceptions/operation.exceptions'
import { type UserRepository } from 'domain/repositories'
import { type UserCreateUseCaseInput } from 'domain/inputs/use-cases/user'
import { UserExistByEmailService } from 'application/services/user'
import { hash } from 'bcrypt'

export default class UserCreateUseCase {
  constructor (private readonly repository: UserRepository) { }

  async exe (input: UserCreateUseCaseInput): Promise<UserEntity> {
    const email = new EmailField(input.email)
    const password = new PasswordField(input.password)

    password.passwordConfirmMatchTest(input.passwordConfirmation)

    if (await new UserExistByEmailService(this.repository).exe(email.value)) {
      throw new AlreadyExistOperationException()
    }

    const hashedPassword = await hash(password.value, 10)

    const form = {
      email: email.value,
      password: hashedPassword
    }

    const res = await this.repository.createUser(form)
    return res
  }
}
