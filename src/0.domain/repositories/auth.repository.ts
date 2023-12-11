export default interface AuthRepository {
  signUp: (form: {
    email: string
    password: string
  }) => Promise<void>
}
