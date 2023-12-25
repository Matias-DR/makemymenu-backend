import type { UserEntity } from 'domain/entities'
import {
  InvalidEmailUserException,
  InvalidPasswordUserException,
  WrongPasswordConfirmationUserException,
  TheNewPasswordIsTheSameAsTheCurrentUserException,
  NewEmailAlreadyInUseUserException,
  PasswordRequiredUserException,
  EmailRequiredUserException
} from 'domain/exceptions/user.exceptions'
import { NothingToUpdateOperationException } from 'domain/exceptions/operation.exceptions'

import {
  compare,
  hash
} from 'bcrypt'

export default class UserModel implements UserEntity {
  private readonly _id?: string
  private _email: string
  private _password: string

  constructor (user: UserEntity) {
    this._id = user.id
    this._email = user.email
    this._password = user.password
  }

  public get email (): string {
    return this._email
  }

  public set email (email: string) {
    this.testEmail(email)
    this._email = email
  }

  public get password (): string {
    return this._password
  }

  public set password (password: string) {
    this.testPassword(password)
    this._password = password
  }

  public get id (): string | undefined {
    return this._id
  }

  public isEmpty (value?: string): boolean {
    return value === undefined || value === null || value === ''
  }

  public testEmail (email?: string): void {
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email ?? this.email)) {
      throw new InvalidEmailUserException()
    }
  }

  public testPassword (password?: string): void {
    if (!(/^(?=.*[!-~])(?=.{8,64})/.test(password ?? this.password))) {
      throw new InvalidPasswordUserException()
    }
  }

  public test (): void {
    if (this.isEmpty(this.email)) {
      throw new EmailRequiredUserException()
    }
    if (this.isEmpty(this.password)) {
      throw new PasswordRequiredUserException()
    }
    this.testEmail()
    this.testPassword()
  }

  public async encryptPassword (): Promise<void> {
    this.password = await hash(this.password, 10)
  }

  public async comparePasswords (password: string): Promise<boolean> {
    return await compare(password, this.password)
  }

  public compareEmails (email: string): boolean {
    return this.email === email
  }

  public async update (
    newEmail?: string,
    newPassword?: string,
    newPasswordConfirmation?: string,
    actualPassword?: string
  ): Promise<void> {
    // Si no hay nada para actualizar
    if (this.isEmpty(newEmail) && this.isEmpty(newPassword)) {
      throw new NothingToUpdateOperationException()
    }
    // Si no hay contraseña
    if (this.isEmpty(actualPassword)) {
      throw new PasswordRequiredUserException()
    }
    // Si hay nueva contraseña y su confirmación
    if (!this.isEmpty(newPassword) && !this.isEmpty(newPasswordConfirmation)) {
      // Si la nueva contraseña es igual a la actual
      if (await this.comparePasswords(newPassword as string)) {
        throw new TheNewPasswordIsTheSameAsTheCurrentUserException()
      }
      // Test a la nueva contraseña
      this.testPassword(newPassword)
      // Si la confirmación de contraseña es diferente a la nueva contraseña
      if (newPasswordConfirmation !== newPassword) {
        throw new WrongPasswordConfirmationUserException()
      }
      this.password = newPassword as string
      await this.encryptPassword()
    }
    // Si hay nuevo email
    if (!this.isEmpty(newEmail)) {
      // Si el nuevo email es igual al actual
      if (this.compareEmails(newEmail as string)) {
        throw new NewEmailAlreadyInUseUserException()
      }
      // Test al nuevo email
      this.testEmail(newEmail)
      this.email = newEmail as string
    }
  }

  public toJSON (): UserEntity {
    return {
      email: this.email,
      password: this.password
    }
  }
}
