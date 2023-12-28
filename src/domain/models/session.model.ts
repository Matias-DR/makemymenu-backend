import type { SessionEntity } from 'domain/entities'
import {
  ExpiredTokenException,
  NoTokenGivenException,
  UnhauthorizedException
} from 'domain/exceptions/session.exceptions'
import {
  JWT_SECRET as SECRET,
  REFRESH_TOKEN_EXPIRES_IN as REFRESH_EXP_TIME,
  ACCESS_TOKEN_EXPIRES_IN as ACCESS_EXP_TIME
} from 'utils/constants.util'

import {
  sign,
  verify,
  decode,
  TokenExpiredError,
  JsonWebTokenError,
  type JwtPayload
} from 'jsonwebtoken'

export default class SessionModel implements SessionEntity {
  private readonly _id?: string
  private _refreshToken: string
  private _accessToken: string
  private readonly _userId?: string

  public static extractTokenFromHeaders (headers: any): string {
    const authorizationHeader = headers.authorization
    if (authorizationHeader === undefined || authorizationHeader === null) {
      throw new NoTokenGivenException()
    }
    const token = authorizationHeader.split(' ')[1]
    if (token === undefined || token === null || token === '') {
      throw new NoTokenGivenException()
    }
    return token
  }

  public static createFromEmail (email: string): SessionModel {
    const refreshToken = sign(
      { email },
      SECRET,
      { expiresIn: REFRESH_EXP_TIME }
    )
    const accessToken = sign(
      { email },
      SECRET,
      { expiresIn: ACCESS_EXP_TIME }
    )
    const session = {
      refreshToken,
      accessToken
    }
    return new SessionModel(session)
  }

  public static test (token: string): void {
    try {
      verify(
        token,
        SECRET
      )
    } catch (error: any) {
      if (error instanceof TokenExpiredError) {
        throw new ExpiredTokenException()
      } else if (error instanceof JsonWebTokenError) {
        throw new UnhauthorizedException()
      }
      throw error
    }
  }

  public static decode (token: string): string {
    const { email } = decode(token) as JwtPayload
    return email
  }

  constructor (session: SessionEntity) {
    this._id = session.id
    this._refreshToken = session.refreshToken
    this._accessToken = session.accessToken
    this._userId = session.userId
  }

  public get refreshToken (): string {
    return this._refreshToken
  }

  public set refreshToken (refreshToken: string) {
    SessionModel.test(refreshToken)
    this._refreshToken = refreshToken
  }

  public get accessToken (): string {
    return this._accessToken
  }

  public set accessToken (accessToken: string) {
    SessionModel.test(accessToken)
    this._accessToken = accessToken
  }

  public update (newEmail?: string): void {
    const email = SessionModel.decode(this._accessToken)
    this._accessToken = sign(
      { email: newEmail ?? email },
      SECRET,
      { expiresIn: ACCESS_EXP_TIME }
    )
  }

  public toJSON (): SessionEntity {
    return {
      refreshToken: this._refreshToken,
      accessToken: this._accessToken
    }
  }
}
