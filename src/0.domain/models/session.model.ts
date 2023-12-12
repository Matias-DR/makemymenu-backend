import type { SessionEntity } from '0.domain/entities'
import type { TokenField } from '0.domain/fields/session'

export default class SessionModel {
  constructor (
    readonly id: string,
    readonly refresh: TokenField,
    readonly access: TokenField
  ) { }

  entity (): SessionEntity {
    return {
      id: this.id,
      refresh: this.refresh.value,
      access: this.access.value
    }
  }
}
