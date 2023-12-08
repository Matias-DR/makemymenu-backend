import {
  sign,
  verify
} from 'jsonwebtoken'
import {
  REFRESH_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_EXPIRES_IN,
  JWT_SECRET
} from 'lib/constants'

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
  let res = true
  verify(
    token,
    JWT_SECRET,
    (error: any) => {
      if (error !== null && error !== undefined) {
        res = false
      }
    }
  )
  return res
}

export function decodeToken (token: string): any {
  const decodedToken = verify(
    token,
    JWT_SECRET
  )
  return decodedToken
}
