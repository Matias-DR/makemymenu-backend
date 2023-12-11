import {
  sign,
  verify
} from 'jsonwebtoken'
import {
  REFRESH_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_EXPIRES_IN,
  JWT_SECRET
} from '1.lib/constants'
import {
  NoTokenGivenException,
  UnhauthorizedException
} from '0.domain/exceptions/session.exceptions'

function createToken (
  data: any,
  expiresIn: number
): string {
  const token = sign(
    data,
    JWT_SECRET,
    { expiresIn }
  )
  return token
}

export function createRefreshToken (data: any): string {
  const expiresIn = REFRESH_TOKEN_EXPIRES_IN
  const token = createToken(
    data,
    expiresIn
  )
  return token
}

export function createAccessToken (data: any): string {
  const expiresIn = ACCESS_TOKEN_EXPIRES_IN
  const token = createToken(
    data,
    expiresIn
  )
  return token
}

export function verifyToken (token: string): boolean {
  verify(
    token,
    JWT_SECRET,
    (error: any) => {
      if (error !== null && error !== undefined) {
        throw new UnhauthorizedException()
      }
    }
  )
  return true
}

export function decodeToken (token: string): any {
  const decodedToken = verify(
    token,
    JWT_SECRET
  )
  return decodedToken
}

export function statusOfToken (refreshToken: string): boolean {
  const { exp } = decodeToken(refreshToken)
  return new Date(exp) <= new Date()
}

export function parseToken (req: any): string {
  const header = req.headers.authorization
  if (header === undefined || header === null || header === '') {
    throw new NoTokenGivenException()
  }
  const token = header.split(' ')[1]
  return token
}
