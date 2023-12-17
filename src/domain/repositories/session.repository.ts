import type { SessionEntity } from 'domain/entities'

export default interface SessionRepository {
  create: (tokens: SessionEntity) => Promise<SessionEntity>
  update: (
    refreshToken: string,
    newAccessToken: string
  ) => Promise<SessionEntity>
  getByRefreshToken: (refreshToken: string) => Promise<SessionEntity>
  getByAccessToken: (accessToken: string) => Promise<SessionEntity>
  deleteByRefreshToken: (refreshToken: string) => Promise<SessionEntity>
  deleteByAccessToken: (accessToken: string) => Promise<SessionEntity>
  existByRefreshToken: (refreshToken: string) => Promise<boolean>
  existByAccessToken: (accessToken: string) => Promise<boolean>
}
