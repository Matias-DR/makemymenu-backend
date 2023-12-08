export default interface SessionRepository {
  existByRefresh: (refreshToken: string) => Promise<boolean>
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
