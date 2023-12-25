import type { UserGateway } from 'domain/gateways'
import { UserModel } from 'domain/models'
import type { UserRepository } from 'domain/repositories'

export default class UserDBGateway implements UserGateway {
  private readonly repository: UserRepository

  constructor (Reposirory: new () => UserRepository) {
    this.repository = new Reposirory()
  }

  async create (user: UserModel): Promise<UserModel> {
    const input = user.toJSON()
    const result = await this.repository.create(input)
    const output = new UserModel(result)
    return output
  }

  async getByEmail (email: string): Promise<UserModel> {
    const result = await this.repository.getByEmail(email)
    const user = new UserModel(result)
    return user
  }

  async update (user: UserModel): Promise<void> {
    await this.repository.update(user.toJSON())
  }

  async deleteByEmail (email: string): Promise<void> {
    await this.repository.deleteByEmail(email)
  }

  async providerDeleteByEmail (email: string): Promise<void> {
    await this.repository.providerDeleteByEmail(email)
  }

  async existByEmail (email: string): Promise<boolean> {
    const result = await this.repository.existByEmail(email)
    return result
  }

  async providerExistByEmail (email: string): Promise<boolean> {
    const result = await this.repository.providerExistByEmail(email)
    return result
  }
}
