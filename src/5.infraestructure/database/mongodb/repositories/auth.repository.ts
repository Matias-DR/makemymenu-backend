import {
  AlreadyExistOperationException,
  UnsuccessfulOperationException
} from '0.domain/exceptions/operation.exceptions'
import { type AuthRepository } from '0.domain/repositories'
import { UserModelImplementation } from '5.infraestructure/database/mongodb/models'

export default class AuthMongoDBRepositoryImplementation implements AuthRepository {
  private async operate (operation: () => Promise<void>): Promise<void> {
    try {
      await operation()
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

  async signUp (input: {
    email: string
    password: string
  }): Promise<void> {
    try {
      await UserModelImplementation.create(input)
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
