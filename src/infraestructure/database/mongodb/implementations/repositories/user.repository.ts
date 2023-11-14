import type { UserEntity } from 'domain/entities'
import {
  AlreadyExistOperationException,
  NotFoundOperationException,
  UnsuccessfulOperationException
} from 'domain/exceptions/operation.exceptions'
import { type UserRepository } from 'domain/repositories'
import { type UserCreateRepositoryInput } from 'domain/inputs/repositories/user'
import { UserModelImplementation } from 'infraestructure/database/mongodb/implementations/models'
import { UserOutputAdapter } from 'infraestructure/database/mongodb/adapters/output'

export default class UserRepositoryImplementation implements UserRepository {
  async createUser (form: UserCreateRepositoryInput): Promise<UserEntity> {
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

  async getUserByEmail (email: string): Promise<UserEntity> {
    try {
      const res = await UserModelImplementation.findOne({ email })
      if (res === null || res === undefined) {
        throw new NotFoundOperationException()
      } else {
        return new UserOutputAdapter(res.toJSON()).exe()
      }
    } catch (error) {
      if (!(error instanceof NotFoundOperationException)) {
        throw new UnsuccessfulOperationException()
      }
      throw error
    }
  }

  async getById (id: string): Promise<UserEntity> {
    try {
      const res = await UserModelImplementation.findById(id)
      if (res === null || res === undefined) {
        throw new NotFoundOperationException()
      } else {
        return new UserOutputAdapter(res.toJSON()).exe()
      }
    } catch (error) {
      if (!(error instanceof NotFoundOperationException)) {
        throw new UnsuccessfulOperationException()
      }
      throw error
    }
  }

  async updateUser (form: UserEntity): Promise<UserEntity> {
    try {
      const res = await UserModelImplementation.findOneAndUpdate(
        { _id: form.id },
        { $set: { ...form } },
        { runValidators: true, new: true }
      )
      if (res !== null && res !== undefined) {
        return new UserOutputAdapter(res.toJSON()).exe()
      } else {
        throw new NotFoundOperationException()
      }
    } catch (error: any) {
      throw new UnsuccessfulOperationException()
    }
  }

  async deleteById (id: string): Promise<UserEntity> {
    try {
      const res = await UserModelImplementation.findOneAndDelete({ _id: id })
      if (res === null || res === undefined) {
        throw new NotFoundOperationException()
      } else {
        return new UserOutputAdapter(res.toJSON()).exe()
      }
    } catch (error) {
      throw new UnsuccessfulOperationException()
    }
  }
}
