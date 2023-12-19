import type { SessionModel } from 'domain/models'

export default interface SessionGateway {
  create: (session: SessionModel) => Promise<SessionModel>
  update: (session: SessionModel) => Promise<void>
  getByRefreshToken: (refreshToken: string) => Promise<SessionModel>
  getByAccessToken: (accessToken: string) => Promise<SessionModel>
  deleteByRefreshToken: (refreshToken: string) => Promise<void>
  deleteByAccessToken: (accessToken: string) => Promise<void>
  existByRefreshToken: (refreshToken: string) => Promise<boolean>
  existByAccessToken: (accessToken: string) => Promise<boolean>
}
