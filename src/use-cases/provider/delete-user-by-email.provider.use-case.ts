import type { UserGateway } from 'domain/gateways'
import { NotFoundOperationException } from 'domain/exceptions/operation.exceptions'

export default class ProviderUserDeleteByEmailUseCase {
  constructor (private readonly dbGateway: UserGateway) { }

  async exe (
    email: string,
    provider: string
  ): Promise<void> {
    if (!await this.dbGateway.providerExistByEmail(
      email,
      provider
    )) {
      throw new NotFoundOperationException()
    }
    await this.dbGateway.providerDeleteByEmail(
      email,
      provider
    )
  }
}
