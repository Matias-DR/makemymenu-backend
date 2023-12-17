import type { UserEntity } from 'domain/entities'
import { UserModel } from 'domain/models'
import type { UserRepository } from 'domain/repositories'

export default class UserDBGateway {
  constructor (private readonly repository: UserRepository) {}

  async create (user: UserModel): Promise<void> {
    await this.repository.create(user.toJSON())
  }

  async getByEmail (email: string): Promise<UserModel> {
    const result = await this.repository.getByEmail(email)
    const user = UserModel.create(result)
    return user
  }

  async update (user: UserModel): Promise<UserEntity> {
    return await this.repository.update(user.toJSON())
  }

  async deleteByEmail (email: string): Promise<void> {
    return await this.repository.deleteByEmail(email)
  }

  async existByEmail (email: string): Promise<boolean> {
    return await this.repository.existByEmail(email)
  }
}
