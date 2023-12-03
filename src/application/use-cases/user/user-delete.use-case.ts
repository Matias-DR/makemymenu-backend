import { type UserEntity } from 'domain/entities'
import { type UserRepository } from 'domain/repositories'
import { WrongPasswordFieldException } from 'domain/exceptions/fields/password.field.exceptions'
import { GetByIdService } from 'application/services/shared'
import { type UserDeleteUseCaseInput } from 'domain/inputs/use-cases/user'
import { compare } from 'bcrypt'

export default class UserDeleteUseCase {
  constructor (private readonly userRepository: UserRepository) { }

  async exe (input: UserDeleteUseCaseInput): Promise<UserEntity> {
    const userGetByIdService = new GetByIdService(this.userRepository)

    // Si no existe levanto error
    const id = await userGetByIdService.exe(input.id)

    // Si la contraseña es incorrecta, levanto error
    if (!await compare(input.password, id.password)) {
      throw new WrongPasswordFieldException()
    }

    const res = await this.userRepository.deleteById(input.id)
    return res
  }
}
