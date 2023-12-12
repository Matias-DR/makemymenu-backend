import type { SessionEntity } from '0.domain/entities'

export default interface SessionRepository {
  delete: (accessToken: string) => Promise<void>
  create: (tokens: {
    refreshToken: string
    accessToken: string
  }) => Promise<SessionEntity>
  getByRefreshToken: (refreshToken: string) => Promise<any>
  getByAccessToken: (accessToken: string) => Promise<any>
  updateTokens: (
    refreshToken: string,
    newTokens: {
      refreshToken: string
      accessToken: string
    }
  ) => Promise<void>
  updateAccessToken: (
    accessToken: string,
    newAccessToken: string
  ) => Promise<void>
}
