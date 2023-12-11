import Field from '0.domain/fields/field'
import {
  ExpiredTokenException,
  NoTokenGivenException,
  UnhauthorizedException
} from '0.domain/exceptions/session.exceptions'
import { JWT_SECRET } from '1.lib/constants'
import {
  sign,
  verify,
  TokenExpiredError,
  JsonWebTokenError
} from 'jsonwebtoken'

export default class TokenField extends Field {
  static getTokenFromHeader (header: any): string {
    const authorizationHeader = header.authorization
    if (authorizationHeader === undefined || authorizationHeader === null) {
      throw new NoTokenGivenException()
    }
    const token = header.split(' ')[1]
    if (token === undefined || token === null || token === '') {
      throw new NoTokenGivenException()
    }
    return token
  }

  static constructFromToken<T extends TokenField> (
    this: new (data: any) => T,
    token: string
  ): T {
    const decoded = verify(
      token,
      JWT_SECRET
    )
    return new this(decoded)
  }

  constructor (
    data: any,
    expiresIn: string | number
  ) {
    const value = sign(
      data,
      JWT_SECRET,
      { expiresIn }
    )
    super(value)
  }

  test (token?: string): void {
    verify(
      token ?? this.value,
      JWT_SECRET,
      (error: any) => {
        if (error !== null && error !== undefined) {
          if (error instanceof TokenExpiredError) {
            throw new ExpiredTokenException()
          }
          if (error instanceof JsonWebTokenError) {
            throw new UnhauthorizedException()
          }
        }
      }
    )
  }

  decode (token?: string): string {
    const decoded = verify(
      token ?? this.value,
      JWT_SECRET
    )
    return decoded as string
  }
}
