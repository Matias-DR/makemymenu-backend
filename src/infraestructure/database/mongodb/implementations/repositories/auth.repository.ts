import type { UserEntity } from 'domain/entities'
import {
  AlreadyExistOperationException,
  UnsuccessfulOperationException
} from 'domain/exceptions/operation.exceptions'
import { type AuthRepository } from 'domain/repositories'
import { type AuthSignUpRepositoryInput } from 'domain/inputs/repositories/auth'
import { UserModelImplementation } from 'infraestructure/database/mongodb/implementations/models'
import { UserOutputAdapter } from 'infraestructure/database/mongodb/adapters/output'

export default class AuthRepositoryImplementation implements AuthRepository {
  async signUp (form: AuthSignUpRepositoryInput): Promise<UserEntity> {
    try {
      const res = await UserModelImplementation.create(form)
      return new UserOutputAdapter(res.toJSON()).exe()
    } catch (error: any) {
      if (Boolean(error.code) && error.code === 11000) {
        throw new AlreadyExistOperationException()
      } else {
        if (error.errors !== undefined && error.errors !== null) {
          const errors = Object.keys(error.errors)
            .map(key => error.errors[key].properties.message)
            .join('\n')
          throw new Error(errors)
        } else {
          throw new UnsuccessfulOperationException()
        }
      }
    }
  }
}
