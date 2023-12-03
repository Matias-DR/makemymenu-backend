import { type UserEntity } from 'domain/entities'
import { type AuthSignUpRepositoryInput } from 'domain/inputs/repositories/auth'

export default interface AuthRepository {
  signUp: (form: AuthSignUpRepositoryInput) => Promise<UserEntity>
}
