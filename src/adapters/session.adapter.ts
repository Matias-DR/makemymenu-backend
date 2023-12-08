export default interface SessionAdapter {
  existByAccessToken: (accessToken: string) => Promise<boolean>
  updateTokens: (tokens: string) => Promise<{
    accessToken: string
    refreshToken: string
  }>
  updateAccessToken: (refreshToken: string) => Promise<string>
}
