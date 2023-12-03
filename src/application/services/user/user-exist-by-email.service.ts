import { type UserRepository } from 'domain/repositories'

export default class UserExistByEmailService {
  constructor (private readonly userRepository: UserRepository) {}

  async exe (email: string): Promise<boolean> {
    try {
      const res = await this.userRepository.getByEmail(email)
      return res !== null || res !== undefined
    } catch (error) {
      return false
    }
  }
}
