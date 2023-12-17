import { type UserEntity } from 'domain/entities'

export default interface UserRepository {
  create: (user: UserEntity) => Promise<UserEntity>
  getByEmail: (email: string) => Promise<UserEntity>
  update: (user: UserEntity) => Promise<UserEntity>
  deleteByEmail: (email: string) => Promise<any>
  existByEmail: (email: string) => Promise<boolean>
}
