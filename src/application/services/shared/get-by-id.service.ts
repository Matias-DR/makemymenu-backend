import { type Repository } from 'domain/repositories'
import { NotFoundOperationException } from 'domain/exceptions/operation.exceptions'

export default class GetByIdService {
  constructor (private readonly repository: Repository) {}

  async exe (id: string): Promise<any> {
    const res = await this.repository.getById(id)
    if (res !== null && res !== undefined) {
      return res
    }
    throw new NotFoundOperationException()
  }
}
