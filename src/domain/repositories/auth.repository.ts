export default interface AuthRepository {
  signIn: (tokens: {
    accessToken: string
    refreshToken: string
  }) => Promise<void>
  signUp: (form: {
    email: string
    password: string
  }) => Promise<void>
}
