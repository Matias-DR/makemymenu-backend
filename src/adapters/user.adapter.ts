import type { UserEntity } from 'domain/entities'

export default interface UserAdapter {
  getByEmail: (data: any) => Promise<UserEntity>
  deleteById: (data: any) => Promise<void>
  update: (data: any) => Promise<{
    id: string
    email: string
  }>
}
