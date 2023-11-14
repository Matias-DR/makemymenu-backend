import { type Repository } from 'domain/repositories'

export default class ExistByIdService {
  constructor (private readonly repository: Repository) {}

  async exe (id: string): Promise<boolean> {
    try {
      const res = await this.repository.getById(id)
      return res !== null || res !== undefined
    } catch (error) {
      return false
    }
  }
}
