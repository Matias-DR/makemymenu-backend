import { Field } from '..'
import {
  EmailRequiredFieldException,
  InvalidEmailFieldException
} from '0.domain/exceptions/fields/email.field.exceptions'

export default class EmailField extends Field {
  constructor (email: string) {
    super(email)
    this.test()
  }

  public test (email?: string): void {
    if (
      (email === undefined || email === null) &&
      (this.value === undefined || this.value === null)
    ) {
      throw new EmailRequiredFieldException()
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email ?? this.value)) {
      throw new InvalidEmailFieldException()
    }
  }
}
