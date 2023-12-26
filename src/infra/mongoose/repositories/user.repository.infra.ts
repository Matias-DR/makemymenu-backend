/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { type UserRepository } from 'domain/repositories'
import type { UserEntity } from 'domain/entities'
import {
  AlreadyExistOperationException,
  UnsuccessfulOperationException
} from 'domain/exceptions/operation.exceptions'
import { UserModelInfra } from 'infra/mongoose/models'
import {
  ProviderUserModelScheme,
  ProviderAccountModelScheme
} from 'infra/mongoose/models/provider'

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

  async update (email: string, user: UserEntity): Promise<void> {
    await UserModelInfra.findOneAndUpdate(
      { email },
      { $set: { ...user } },
      { runValidators: true, new: true }
    )
  }

  async deleteByEmail (email: string): Promise<void> {
    await UserModelInfra.findOneAndDelete({ email })
  }

  async providerDeleteByEmail (email: string): Promise<void> {
    const result = await ProviderUserModelScheme.findOneAndDelete({ email })
    const userId = result!.toJSON()._id
    await ProviderAccountModelScheme.findOneAndDelete({ userId })
  }

  async existByEmail (email: string): Promise<boolean> {
    return await UserModelInfra.exists({ email })
      .then((res: any) => res)
  }

  async providerExistByEmail (email: string): Promise<boolean> {
    return await ProviderUserModelScheme.exists({ email })
      .then((res: any) => res)
  }
}
