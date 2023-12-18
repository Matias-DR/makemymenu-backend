import type { SessionEntity } from 'domain/entities'

export default interface SessionRepository {
  create: (tokens: SessionEntity) => Promise<SessionEntity>
  update: (
    refreshToken: string,
    newAccessToken: string
  ) => Promise<void>
  getByRefreshToken: (refreshToken: string) => Promise<SessionEntity>
  getByAccessToken: (accessToken: string) => Promise<SessionEntity>
  deleteByRefreshToken: (refreshToken: string) => Promise<void>
  deleteByAccessToken: (accessToken: string) => Promise<void>
  existByRefreshToken: (refreshToken: string) => Promise<boolean>
  existByAccessToken: (accessToken: string) => Promise<boolean>
}
