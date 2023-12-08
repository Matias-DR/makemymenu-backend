export default interface SessionRepository {
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
    refreshToken: string,
    newAccessToken: string
  ) => Promise<void>
}
