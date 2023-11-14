import { GetByIdService } from 'application/services/shared'
import { type Repository } from 'domain/repositories'

export default class GetByIdController {
  constructor (
    private readonly repository: Repository,
    private readonly data: any
  ) { }

  async exe (): Promise<any> {
    const getByIdService = new GetByIdService(this.repository)
    const res = await getByIdService.exe(this.data.id)
    return res
  }
}
