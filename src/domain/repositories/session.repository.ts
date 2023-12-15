import type { SessionEntity } from 'domain/entities'

export default interface SessionRepository {
  deleteByAccessToken: (accessToken: string) => Promise<void>
  create: (tokens: {
    refreshToken: string
    accessToken: string
  }) => Promise<SessionEntity>
  getByRefreshToken: (refreshToken: string) => Promise<SessionEntity>
  getByAccessToken: (accessToken: string) => Promise<SessionEntity>
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
