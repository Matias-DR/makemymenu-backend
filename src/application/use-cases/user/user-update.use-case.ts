import { type UserEntity } from 'domain/entities'
import {
  EmailField,
  PasswordField
} from 'domain/fields'
import {
  NewEmailAlreadyInUseFieldException,
  InvalidEmailFieldException
} from 'domain/exceptions/fields/email.field.exceptions'
import {
  TheNewPasswordIsTheSameAsTheCurrentFieldException,
  WrongPasswordFieldException
} from 'domain/exceptions/fields/password.field.exceptions'
import {
  NothingToUpdateOperationException
} from 'domain/exceptions/operation.exceptions'
import { UserModel } from 'domain/models'
import { type UserRepository } from 'domain/repositories'
import { GetByIdService } from 'application/services/shared'
import {
  UserExistByEmailService
} from 'application/services/user'
import { type UserUpdateUseCaseInput } from 'domain/inputs/use-cases/user'
import {
  compare,
  hash
} from 'bcrypt'

export default class UserUpdateUseCase {
  constructor (private readonly userRepository: UserRepository) { }

  async exe (input: UserUpdateUseCaseInput): Promise<UserEntity> {
    const userGetByIdService = new GetByIdService(this.userRepository)

    // Si no existe levanto error
    const userById = await userGetByIdService.exe(input.id)

    // Si el email es incorrecto levanto error
    if (userById.email !== input.email) {
      throw new InvalidEmailFieldException()
    }

    // Si no hay nada para actualizar levanto error
    if (
      (input.newEmail === undefined || input.newEmail === null) &&
      (input.newPassword === undefined || input.newPassword === null)
    ) {
      throw new NothingToUpdateOperationException()
    }

    const user = new UserModel(
      input.id,
      new EmailField(input.newEmail ?? input.email),
      new PasswordField(input.newPassword ?? input.password)
    )

    // Si hay nueva contraseña
    if (input.newPassword !== undefined && input.newPassword !== null) {
      // Si la ocnfirmación de contraseña es incorrecta (o no existe), levanto error
      user.password.passwordConfirmMatchTest(input.newPasswordConfirmation)
      // Si la nueva contraseña es igual al actual, levanto error
      if (userById.password === input.newPassword) {
        throw new TheNewPasswordIsTheSameAsTheCurrentFieldException()
      }
    }

    // Si hay nuevo email
    if (input.newEmail !== undefined && input.newEmail !== null) {
      // Si el nuevo email existe, levanto error
      if (await new UserExistByEmailService(this.userRepository).exe(user.email.value)) {
        throw new NewEmailAlreadyInUseFieldException()
      }
    }

    console.log('estas son las contraseñas', input.password, userById.password)
    // Si la contraseña es incorrecta, levanto error
    if (!await compare(input.password, userById.password)) {
      throw new WrongPasswordFieldException()
    }

    const hashedPassword = await hash(user.password.value, 10)

    const form = {
      id: user.id,
      email: user.email.value,
      password: hashedPassword
    }

    const res = await this.userRepository.update(form)
    return res
  }
}
