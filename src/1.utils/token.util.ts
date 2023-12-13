import {
  ExpiredTokenException,
  NoTokenGivenException,
  UnhauthorizedException
} from '0.domain/exceptions/session.exceptions'
import {
  JWT_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_EXPIRES_IN
} from '1.utils/constants.util'
import {
  sign,
  verify,
  decode,
  TokenExpiredError,
  JsonWebTokenError
} from 'jsonwebtoken'

function createToken (
  data: any,
  expiresIn: string | number
): string {
  const value = sign(
    data,
    JWT_SECRET,
    { expiresIn }
  )
  return value
}

export function createAccessToken (data: any): string {
  return createToken(
    data,
    ACCESS_TOKEN_EXPIRES_IN
  )
}

export function createRefreshToken (data: any): string {
  return createToken(
    data,
    REFRESH_TOKEN_EXPIRES_IN
  )
}

export function verifyToken (token: string): any {
  try {
    const value = verify(
      token,
      JWT_SECRET
    )
    return value
  } catch (error: any) {
    if (error instanceof TokenExpiredError) {
      throw new ExpiredTokenException()
    } else if (error instanceof JsonWebTokenError) {
      throw new UnhauthorizedException()
    }
    throw error
  }
}

export function decodeToken (token: string): any {
  const value = decode(token)
  return value
}

export function extractTokenFromHeaders (headers: any): string {
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
