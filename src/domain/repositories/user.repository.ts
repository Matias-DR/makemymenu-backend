import { type Repository } from '.'
import { type UserEntity } from 'domain/entities'
import { type Nullable } from 'domain/shared/nullable'

export default interface UserRepository extends Repository {
  create: (input: {
    email: string
    password: string
  }) => Promise<UserEntity>
  getById: (id: string) => Promise<Nullable<any>>
  getByEmail: (email: string) => Promise<Nullable<UserEntity>>
  update: (form: UserEntity) => Promise<UserEntity>
  deleteById: (id: string) => Promise<any>
}
