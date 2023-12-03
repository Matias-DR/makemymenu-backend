import { type Repository } from '.'
import { type UserEntity } from 'domain/entities'
import { type Nullable } from 'domain/shared/nullable'

export default interface UserRepository extends Repository {
  getByEmail: (email: string) => Promise<Nullable<UserEntity>>
  update: (form: UserEntity) => Promise<UserEntity>
}
