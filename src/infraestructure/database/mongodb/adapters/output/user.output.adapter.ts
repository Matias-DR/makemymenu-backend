import { type UserEntity } from 'domain/entities'

export default class UserOutputAdapter {
  constructor (
    private readonly data: any
  ) { }

  exe (): UserEntity {
    return {
      id: this.data._id,
      email: this.data.email,
      password: this.data.password
    }
  }
}
