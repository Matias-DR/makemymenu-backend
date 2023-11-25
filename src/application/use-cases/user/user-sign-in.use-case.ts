import { type UserEntity } from 'domain/entities'
import {
  EmailField,
  PasswordField
} from 'domain/fields'
import { WrongPasswordFieldException } from 'domain/exceptions/fields/password.field.exceptions'
import { type UserRepository } from 'domain/repositories'
import { type UserSignInUseCaseInput } from 'domain/inputs/use-cases/user'
import { UserGetByEmailService } from 'application/services/user'
import { compare } from 'bcrypt'

export default class UserSignInUseCase {
  constructor (private readonly repository: UserRepository) { }

  async exe (input: UserSignInUseCaseInput): Promise<UserEntity> {
    const email = new EmailField(input.email)
    const password = new PasswordField(input.password)

    const res = await new UserGetByEmailService(this.repository).exe(email.value)

    if (!await compare(password.value, res.password)) {
      throw new WrongPasswordFieldException()
    }

    return res
  }
}
