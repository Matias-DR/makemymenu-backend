import { type UserEntity } from 'domain/entities'
import type {
  EmailField,
  PasswordField
} from 'domain/fields/user'

export default class UserModel {
  constructor (
    public readonly id: string,
    public readonly email: EmailField,
    public readonly password: PasswordField
  ) { }

  public entity (): UserEntity {
    return {
      id: this.id,
      email: this.email.value,
      password: this.password.value
    }
  }
}
