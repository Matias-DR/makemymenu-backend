import { TokenField } from '.'

export default class AccessToken extends TokenField {
  constructor (data: any) {
    super(
      data,
      '1d'
    )
  }
}
