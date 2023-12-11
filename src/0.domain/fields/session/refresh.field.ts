import { TokenField } from '.'

export default class RefreshField extends TokenField {
  constructor (data: any) {
    super(
      data,
      '30d'
    )
  }
}
