import { type UserRepository } from 'domain/repositories'
import type { UserEntity } from 'domain/entities'
import {
  AlreadyExistOperationException,
  UnsuccessfulOperationException
} from 'domain/exceptions/operation.exceptions'
import { UserModelInfra } from 'infra/mongoose/models'

export default class UserMongoDBRepositoryInfra implements UserRepository {
  async create (user: UserEntity): Promise<UserEntity> {
    return await UserModelInfra.create(user)
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
    return await UserModelInfra.findOne({ email })
      .then((res: any) => res?.toJSON())
  }

  async update (user: UserEntity): Promise<UserEntity> {
    return await UserModelInfra.findOneAndUpdate(
      { email: user.email },
      { $set: { ...user } },
      { runValidators: true, new: true }
    ).then((res: any) => res?.toJSON())
  }

  async deleteByEmail (email: string): Promise<UserEntity> {
    return await UserModelInfra.findByIdAndDelete({ email })
      .then((res: any) => res?.toJSON())
  }

  async existByEmail (email: string): Promise<boolean> {
    return await UserModelInfra.exists({ email })
      .then((res: any) => res)
  }
}
