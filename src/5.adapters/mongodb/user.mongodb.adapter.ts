import type { UserEntity } from '0.domain/entities'
import { type UserRepository } from '0.domain/repositories'
import { UserServices } from '2.services'
import { UserUseCases } from '3.use-cases'
import { type UserAdapter } from '5.adapters'

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

    return res
  }

  async deleteById (data: any): Promise<void> {
    const input = {
      id: data.id,
      password: data.password
    }

    await this.useCases.deleteById(input)
  }

  async update (data: any): Promise<{
    id: string
    email: string
  }> {
    const input = {
      id: data.id,
      email: data.email,
      password: data.password,
      newEmail: data.newEmail,
      newPassword: data.newPassword,
      newPasswordConfirmation: data.newPasswordConfirmation
    }

    const res = await this.useCases.update(input)

    const output = {
      id: res.id,
      email: res.email
    }

    return output
  }
}
