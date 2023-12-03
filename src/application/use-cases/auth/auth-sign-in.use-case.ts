import { type UserEntity } from 'domain/entities'
import {
  EmailField,
  PasswordField
} from 'domain/fields'
import { WrongPasswordFieldException } from 'domain/exceptions/fields/password.field.exceptions'
import { type UserRepository } from 'domain/repositories'
import { type AuthSignInUseCaseInput } from 'domain/inputs/use-cases/auth'
import { UserGetByEmailService } from 'application/services/user'
import { compare } from 'bcrypt'

export default class AuthSignInUseCase {
  constructor (private readonly repository: UserRepository) { }

  async exe (input: AuthSignInUseCaseInput): Promise<UserEntity> {
    const email = new EmailField(input.email)
    let password = null
    try {
      password = new PasswordField(input.password)
    } catch {
      throw new WrongPasswordFieldException()
    }

    const res = await new UserGetByEmailService(this.repository).exe(email.value)

    if (!await compare(password.value, res.password)) {
      throw new WrongPasswordFieldException()
    }

    return res
  }
}
