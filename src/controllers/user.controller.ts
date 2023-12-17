import type { UserRepository } from 'domain/repositories'
import {
  UserCreateUseCase,
  UserUpdateUseCase,
  UserDeleteByEmailUseCase,
  UserGetByEmailUseCase,
  UserAuthenticationUseCase
} from 'use-cases/user'
import type {
  SuccessfullResponse,
  UnsuccessfullResponse
} from './definitions'
import { SessionModel } from 'domain/models'

export default class UserController {
  constructor (private readonly repository: UserRepository) { }

  async create (
    body: any,
    success: SuccessfullResponse,
    error: UnsuccessfullResponse
  ): Promise<void> {
    const email = body.email
    const password = body.password
    const passwordConfirmation = body.passwordConfirmation
    try {
      const useCase = new UserCreateUseCase(this.repository)
      await useCase.exe(
        email,
        password,
        passwordConfirmation
      )
      success(201)
    } catch (err: any) {
      error(err)
    }
  }

  async get (
    headers: any,
    success: SuccessfullResponse,
    error: UnsuccessfullResponse
  ): Promise<void> {
    try {
      const accessToken = SessionModel.extractTokenFromHeaders(headers)
      const email = SessionModel.decode(accessToken)
      const useCase = new UserGetByEmailUseCase(this.repository)
      const result = await useCase.exe(email)
      success(
        200,
        result
      )
    } catch (err: any) {
      error(err)
    }
  }

  async update (
    headers: any,
    body: any,
    error: UnsuccessfullResponse,
    next: () => void
  ): Promise<void> {
    try {
      const refreshToken = SessionModel.extractTokenFromHeaders(headers)
      const email = SessionModel.decode(refreshToken)
      const password = body.password
      const newEmail = body.newEmail ?? undefined
      const newPassword = body.newPassword ?? undefined
      const newPasswordConfirmation = body.newPasswordConfirmation ?? undefined
      const useCase = new UserUpdateUseCase(this.repository)
      await useCase.exe(
        email,
        password,
        newEmail,
        newPassword,
        newPasswordConfirmation
      )
      // await this.sessionUseCases.deleteByAccessToken(token)
      // const result = await this.sessionUseCases.create(user)
      // res.status(200).json(output)
      next()
    } catch (err: any) {
      error(err)
    }
  }

  async delete (
    headers: any,
    body: any,
    error: UnsuccessfullResponse,
    next: () => void
  ): Promise<void> {
    try {
      const accessToken = SessionModel.extractTokenFromHeaders(headers)
      const email = SessionModel.decode(accessToken)
      const password = body.password
      const useCase = new UserDeleteByEmailUseCase(this.repository)
      await useCase.exe(
        email,
        password
      )
      next()
      // await this.sessionUseCases.deleteByAccessToken(token)
    } catch (err: any) {
      error(err)
    }
  }

  async authentication (
    body: any,
    error: UnsuccessfullResponse,
    next: () => void
  ): Promise<void> {
    try {
      const email = body.email
      const password = body.password
      const useCase = new UserAuthenticationUseCase(this.repository)
      await useCase.exe(
        email,
        password
      )
      next()
    } catch (err: any) {
      error(err)
    }
  }
}
