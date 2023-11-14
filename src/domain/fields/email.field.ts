import { Field } from '.'
import { InvalidEmailFieldException } from 'domain/exceptions/fields/email.field.exceptions'

export default class EmailField extends Field {
  constructor (email: string) {
    super(email)
    this.test()
  }

  public test (email?: string): void {
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email ?? this.value)) {
      throw new InvalidEmailFieldException()
    }
  }
}
