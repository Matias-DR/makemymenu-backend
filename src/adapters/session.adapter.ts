export default interface SessionAdapter {
  updateTokens: (tokens: string) => Promise<{
    accessToken: string
    refreshToken: string
  }>
  updateAccessToken: (refreshToken: string) => Promise<string>
}
