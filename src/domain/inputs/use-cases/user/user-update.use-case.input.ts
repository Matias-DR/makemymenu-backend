export default interface UserUpdateUseCaseInput {
  id: string
  email: string
  password: string
  newEmail?: string
  newPassword?: string
  newPasswordConfirmation?: string
}
