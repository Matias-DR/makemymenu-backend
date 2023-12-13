import { type Repository } from '.'
import { type UserEntity } from 'domain/entities'
import { type Nullable } from 'domain/shared/nullable'

export default interface UserRepository extends Repository {
  create: (input: {
    email: string
    password: string
  }) => Promise<UserEntity>
  getByEmail: (email: string) => Promise<Nullable<UserEntity>>
  update: (form: UserEntity) => Promise<UserEntity>
}
