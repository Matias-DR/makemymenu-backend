import { type UserModel } from 'domain/models'

export default interface UserGateway {
  create: (user: UserModel) => Promise<UserModel>
  getByEmail: (email: string) => Promise<UserModel>
  update: (user: UserModel) => Promise<void>
  deleteByEmail: (email: string) => Promise<void>
  existByEmail: (email: string) => Promise<boolean>
}
