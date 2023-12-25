import { type UserRepository } from 'domain/repositories'
import type { UserEntity } from 'domain/entities'
import {
  AlreadyExistOperationException,
  UnsuccessfulOperationException
} from 'domain/exceptions/operation.exceptions'
import { UserModelInfra } from 'infra/mongoose/models'

export default class UserMongoDBRepositoryInfra implements UserRepository {
  private readonly resultAdapter = (res: any): UserEntity => {
    const result = res?.toJSON()
    return {
      ...result,
      id: result._id
    }
  }

  async create (user: UserEntity): Promise<UserEntity> {
    return await UserModelInfra.create(user)
      .then((res: any) => this.resultAdapter(res))
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
      .then((res: any) => this.resultAdapter(res))
  }

  async update (user: UserEntity): Promise<void> {
    await UserModelInfra.findOneAndUpdate(
      { email: user.email },
      { $set: { ...user } },
      { runValidators: true, new: true }
    )
  }

  async deleteByEmail (email: string): Promise<void> {
    await UserModelInfra.findOneAndDelete({ email })
  }

  async providerDeleteByEmail (email: string): Promise<void> {
    await UserModelInfra.findOneAndDelete({ email })
  }

  async existByEmail (email: string): Promise<boolean> {
    return await UserModelInfra.exists({ email })
      .then((res: any) => res)
  }

  async providerExistByEmail (email: string): Promise<boolean> {
    return await UserModelInfra.exists({ email })
      .then((res: any) => res)
  }
}
