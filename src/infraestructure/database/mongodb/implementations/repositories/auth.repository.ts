import {
  AlreadyExistOperationException,
  UnsuccessfulOperationException
} from 'domain/exceptions/operation.exceptions'
import { type AuthRepository } from 'domain/repositories'
import {
  SessionModelImplementation,
  UserModelImplementation
} from 'infraestructure/database/mongodb/implementations/models'

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
    const operation = async (): Promise<void> => {
      await UserModelImplementation.create(input)
    }
    await this.operate(operation)
  }

  async signIn (input: {
    refreshToken: string
    accessToken: string
  }): Promise<void> {
    const operation = async (): Promise<void> => {
      await SessionModelImplementation.create(input)
    }
    await this.operate(operation)
  }
}
