import type { UserEntity } from 'domain/entities'
import { type UserRepository } from 'domain/repositories'
import { UserServices } from 'services'
import { UserUseCases } from 'use-cases'
import { type UserAdapter } from 'adapters'

export default class UserMongoDBAdapter implements UserAdapter {
  private readonly useCases: UserUseCases
  private readonly services: UserServices

  constructor (private readonly repository: UserRepository) {
    this.useCases = new UserUseCases(this.repository)
    this.services = new UserServices(this.repository)
  }

  async getByEmail (data: any): Promise<UserEntity> {
    const input = data.email

    const res = await this.services.getByEmail(input)

    // const output = { }

    return res
  }

  async deleteById (data: any): Promise<void> {
    const input = {
      id: data.id,
      password: data.password
    }

    await this.useCases.deleteById(input)
  }

  async update (data: any): Promise<UserEntity> {
    const input = {
      id: data.id,
      email: data.email,
      password: data.password,
      newEmail: data.newEmail,
      newPassword: data.newPassword,
      newPasswordConfirmation: data.newPasswordConfirmation
    }

    const res = await this.useCases.update(input)

    // const output = { }

    return res
  }
}
