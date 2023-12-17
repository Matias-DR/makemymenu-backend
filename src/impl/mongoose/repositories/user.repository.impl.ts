import { type UserRepository } from 'domain/repositories'
import type { UserEntity } from 'domain/entities'
import {
  AlreadyExistOperationException,
  UnsuccessfulOperationException
} from 'domain/exceptions/operation.exceptions'
import { UserModelImpl } from 'impl/mongoose/models'

export default class UserMongoDBRepositoryImpl implements UserRepository {
  async create (user: UserEntity): Promise<UserEntity> {
    return await UserModelImpl.create(user)
      .then((res: any) => res?.toJSON())
      .catch((error: any) => {
        if (error.code === 11000) {
          throw new AlreadyExistOperationException()
        } else {
          throw new UnsuccessfulOperationException()
        }
      })
  }

  async getByEmail (email: string): Promise<UserEntity> {
    return await UserModelImpl.findOne({ email })
      .then((res: any) => res?.toJSON())
  }

  async update (user: UserEntity): Promise<UserEntity> {
    return await UserModelImpl.findOneAndUpdate(
      { email: user.email },
      { $set: { ...user } },
      { runValidators: true, new: true }
    ).then((res: any) => res?.toJSON())
  }

  async deleteByEmail (email: string): Promise<UserEntity> {
    return await UserModelImpl.findByIdAndDelete({ email })
      .then((res: any) => res?.toJSON())
  }

  async existByEmail (email: string): Promise<boolean> {
    return await UserModelImpl.exists({ email })
      .then((res: any) => res)
  }
}
