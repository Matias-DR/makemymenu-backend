import type { UserEntity } from 'domain/entities'
import {
  NotFoundOperationException,
  UnsuccessfulOperationException
} from 'domain/exceptions/operation.exceptions'
import { type UserRepository } from 'domain/repositories'
import { UserModelImplementation } from 'infraestructure/database/mongodb/implementations/models'
import { UserOutputAdapter } from 'infraestructure/database/mongodb/adapters/output'
import { Error } from 'mongoose'

export default class UserRepositoryImplementation implements UserRepository {
  async getByEmail (email: string): Promise<UserEntity> {
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
    let res = null
    try {
      res = await UserModelImplementation.findById(id)
    } catch (error) {
      if (error instanceof Error.CastError) {
        throw new NotFoundOperationException()
      }
    }
    try {
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

  async update (form: UserEntity): Promise<UserEntity> {
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
