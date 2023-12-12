import { type Repository } from '.'
import { type UserEntity } from '0.domain/entities'
import { type Nullable } from '0.domain/shared/nullable'

export default interface UserRepository extends Repository {
  create: (input: {
    email: string
    password: string
  }) => Promise<UserEntity>
  getByEmail: (email: string) => Promise<Nullable<UserEntity>>
  update: (form: UserEntity) => Promise<UserEntity>
}
