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
import { sign } from 'jsonwebtoken'
import 'dotenv/config'

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

    const user = await new UserGetByEmailService(this.repository).exe(email.value)

    if (!await compare(password.value, user.password)) {
      throw new WrongPasswordFieldException()
    }

    const token = sign(
      { id: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: 60 * 60 * 24 * 30 }
    )

    const res = {
      ...user,
      token
    }

    return res
  }
}
