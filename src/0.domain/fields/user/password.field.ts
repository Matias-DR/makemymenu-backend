import { Field } from '..'
import {
  InvalidPasswordFieldException,
  WrongPasswordConfirmationFieldException
} from '0.domain/exceptions/fields/password.field.exceptions'

export default class PasswordField extends Field {
  constructor (password: string) {
    super(password)
    this.test()
  }

  public test (password?: string): void {
    if (!/^(?=.*[!-~])(?=.{8,64})/.test(password ?? this.value)) {
      throw new InvalidPasswordFieldException()
    }
  }

  public passwordConfirmMatchTest (passwordConfirmation?: string): void {
    if (
      passwordConfirmation === undefined ||
      passwordConfirmation === null ||
      passwordConfirmation !== this.value
    ) {
      throw new WrongPasswordConfirmationFieldException()
    }
  }
}
