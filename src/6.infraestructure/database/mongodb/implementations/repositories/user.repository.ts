import type { UserEntity } from '0.domain/entities'
import {
  NotFoundOperationException,
  UnsuccessfulOperationException
} from '0.domain/exceptions/operation.exceptions'
import { type UserRepository } from '0.domain/repositories'
import { UserModelImplementation } from '6.infraestructure/database/mongodb/implementations/models'
import { Error } from 'mongoose'

export default class UserMongoDBRepositoryImplementation implements UserRepository {
  async getByEmail (email: string): Promise<UserEntity> {
    try {
      const res = await UserModelImplementation.findOne({ email })
      if (res === null || res === undefined) {
        throw new NotFoundOperationException()
      } else {
        const user = res.toJSON()
        return {
          id: user._id.toString(),
          email: user.email,
          password: user.password
        }
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
        const user = res.toJSON()
        return {
          id: user._id.toString(),
          email: user.email,
          password: user.password
        }
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
      const res = await UserModelImplementation.findByIdAndUpdate(
        { _id: form.id },
        { $set: { ...form } },
        { runValidators: true, new: true }
      )
      if (res !== null && res !== undefined) {
        const user = res.toJSON()
        return {
          id: user._id.toString(),
          email: user.email,
          password: user.password
        }
      } else {
        throw new NotFoundOperationException()
      }
    } catch (error: any) {
      throw new UnsuccessfulOperationException()
    }
  }

  async deleteById (id: string): Promise<UserEntity> {
    try {
      const res = await UserModelImplementation.findByIdAndDelete(id)
      if (res === null || res === undefined) {
        throw new NotFoundOperationException()
      } else {
        const user = res.toJSON()
        return {
          id: user._id.toString(),
          email: user.email,
          password: user.password
        }
      }
    } catch (error) {
      throw new UnsuccessfulOperationException()
    }
  }
}
