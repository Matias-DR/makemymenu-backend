import type { Repository } from 'domain/repositories'
import { type SharedAdapter } from 'adapters'
import { SharedServices } from 'services'

export default class SharedMongoDBAdapter implements SharedAdapter {
  private readonly services: SharedServices

  constructor (private readonly repository: Repository) {
    this.services = new SharedServices(this.repository)
  }

  async getById (data: any): Promise<any> {
    const input = data.id

    const res = await this.services.getById(input)

    // const output = { }

    return res
  }

  async existById (data: any): Promise<any> {
    const input = data.id

    const res = await this.services.existById(input)

    // const output = { }

    return res
  }

  async deleteById (data: any): Promise<any> {
    const input = data.id

    const res = await this.services.deleteById(input)

    // const output = { }

    return res
  }
}
