import { type UserEntity } from 'domain/entities'
import {
  EmailField,
  PasswordField
} from 'domain/fields/user'
import {
  NewEmailAlreadyInUseFieldException,
  InvalidEmailFieldException
} from 'domain/exceptions/fields/email.field.exceptions'
import {
  TheNewPasswordIsTheSameAsTheCurrentFieldException,
  WrongPasswordFieldException
} from 'domain/exceptions/fields/password.field.exceptions'
import { AlreadyExistOperationException, NothingToUpdateOperationException } from 'domain/exceptions/operation.exceptions'
import { UserModel } from 'domain/models'
import type { UserRepository } from 'domain/repositories'
import {
  UserServices,
  SharedServices
} from 'services'

import {
  compare,
  hash
} from 'bcrypt'

export default class UserUseCases {
  private readonly userServices: UserServices
  private readonly sharedServices: SharedServices

  constructor (private readonly userRepository: UserRepository) {
    this.userServices = new UserServices(this.userRepository)
    this.sharedServices = new SharedServices(this.userRepository)
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

    const user = await this.userServices.getByEmail(email.value)

    if (!await compare(password.value, user.password)) {
      throw new WrongPasswordFieldException()
    }

    return user
  }

  async create (input: {
    email: string
    password: string
    passwordConfirmation: string
  }): Promise<UserEntity> {
    const email = new EmailField(input.email)
    const password = new PasswordField(input.password)

    password.passwordConfirmMatchTest(input.passwordConfirmation)

    if (await this.userServices.existByEmail(email.value)) {
      throw new AlreadyExistOperationException()
    }

    const hashedPassword = await hash(password.value, 10)

    const form = {
      email: email.value,
      password: hashedPassword
    }

    return await this.userRepository.create(form)
  }

  async deleteById (input: {
    id: string
    password: string
  }): Promise<void> {
    // Si no existe levanto error
    const id = await this.sharedServices.getById(input.id)

    // Si la contraseña es incorrecta, levanto error
    if (!await compare(input.password, id.password)) {
      throw new WrongPasswordFieldException()
    }

    await this.sharedServices.deleteById(input.id)
  }

  async update (input: {
    id: string
    email: string
    password: string
    newEmail?: string
    newPassword?: string
    newPasswordConfirmation?: string
  }): Promise<UserEntity> {
    // Si no existe levanto error
    const userById = await this.sharedServices.getById(input.id)

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
      if (await this.userServices.existByEmail(user.email.value)) {
        throw new NewEmailAlreadyInUseFieldException()
      }
    }

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
