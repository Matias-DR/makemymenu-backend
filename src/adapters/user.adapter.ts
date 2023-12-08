import type { UserEntity } from 'domain/entities'

export default interface UserAdapter {
  getByEmail: (data: any) => Promise<any>
  deleteById: (data: any) => Promise<void>
  update: (data: any) => Promise<UserEntity>
}
