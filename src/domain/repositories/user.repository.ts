import { type Repository } from '.'
import { type UserCreateRepositoryInput } from 'domain/inputs/repositories/user'
import { type UserEntity } from 'domain/entities'
import { type Nullable } from 'domain/shared/nullable'

export default interface UserRepository extends Repository {
  createUser: (form: UserCreateRepositoryInput) => Promise<UserEntity>
  getUserByEmail: (email: string) => Promise<Nullable<UserEntity>>
  updateUser: (form: UserEntity) => Promise<UserEntity>
}
