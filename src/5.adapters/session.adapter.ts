export default interface SessionAdapter {
  updateSession: (
    accessToken: string,
    user: {
      id: string
      email: string
    }
  ) => Promise<{
    accessToken: string
    refreshToken: string
  }>
  existByAccessToken: (accessToken: string) => Promise<boolean>
  updateTokens: (refreshToken: string) => Promise<{
    accessToken: string
    refreshToken: string
  }>
  updateAccessToken: (refreshToken: string) => Promise<string>
}
