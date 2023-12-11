import {
  ImpossibleToPerformOperationException,
  NotFoundOperationException
} from '0.domain/exceptions/operation.exceptions'
import type { Repository } from '0.domain/repositories'

export default class SharedServices {
  constructor (private readonly repository: Repository) { }

  async getById (id: string): Promise<any> {
    const res = await this.repository.getById(id)
    if (res !== null && res !== undefined) {
      return res
    }
    throw new NotFoundOperationException()
  }

  async existById (id: string): Promise<boolean> {
    try {
      const res = await this.getById(id)
      return res !== null && res !== undefined
    } catch (error) {
      return false
    }
  }

  async deleteById (id: string): Promise<void> {
    if (this.repository.deleteById === undefined) {
      throw new ImpossibleToPerformOperationException()
    }
    try {
      await this.repository.deleteById(id)
    } catch (error) {
      throw new ImpossibleToPerformOperationException()
    }
  }
}
