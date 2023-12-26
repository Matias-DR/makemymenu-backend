import { type UserEntity } from 'domain/entities'

export default interface UserRepository {
  create: (user: UserEntity) => Promise<UserEntity>
  getByEmail: (email: string) => Promise<UserEntity>
  update: (email: string, user: UserEntity) => Promise<void>
  deleteByEmail: (email: string) => Promise<void>
  providerDeleteByEmail: (email: string) => Promise<void>
  existByEmail: (email: string) => Promise<boolean>
  providerExistByEmail: (email: string) => Promise<boolean>
}
