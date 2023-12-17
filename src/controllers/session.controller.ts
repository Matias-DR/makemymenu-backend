import type { SessionRepository } from 'domain/repositories'
import {
  SessionCreateUseCase,
  SessionGetByRefreshTokenUseCase,
  SessionGetByAccessTokenUseCase,
  SessionUpdateUseCase,
  SessionDeleteByRefreshTokenUseCase,
  SessionDeleteByAccessTokenUseCase
} from 'use-cases/session'
import type {
  SuccessfullResponse,
  UnsuccessfullResponse
} from './definitions'
import { SessionModel } from 'domain/models'

export default class SessionController {
  constructor (private readonly repository: SessionRepository) { }

  public async create (
    body: any,
    success: SuccessfullResponse,
    error: UnsuccessfullResponse
  ): Promise<void> {
    const email = body.email
    try {
      const useCase = new SessionCreateUseCase(this.repository)
      const result = await useCase.exe(email)
      success(
        201,
        result.toJSON()
      )
    } catch (err: any) {
      error(
        err
      )
    }
  }

  private async get (
    req: any,
    success: SuccessfullResponse,
    error: UnsuccessfullResponse,
    useCase: SessionGetByRefreshTokenUseCase | SessionGetByAccessTokenUseCase
  ): Promise<void> {
    try {
      const token = SessionModel.extractTokenFromHeaders(req.headers)
      const result = await useCase.exe(token)
      success(
        200,
        result
      )
    } catch (err: any) {
      error(
        err
      )
    }
  }

  public async getByRefreshToken (
    req: any,
    success: SuccessfullResponse,
    error: UnsuccessfullResponse
  ): Promise<void> {
    const useCase = new SessionGetByRefreshTokenUseCase(this.repository)
    await this.get(
      req,
      success,
      error,
      useCase
    )
  }

  public async getByAccessToken (
    req: any,
    success: SuccessfullResponse,
    error: UnsuccessfullResponse
  ): Promise<void> {
    const useCase = new SessionGetByAccessTokenUseCase(this.repository)
    await this.get(
      req,
      success,
      error,
      useCase
    )
  }

  public async update (
    headers: any,
    success: SuccessfullResponse,
    error: UnsuccessfullResponse
  ): Promise<void> {
    try {
      const refreshToken = SessionModel.extractTokenFromHeaders(headers)
      const useCase = new SessionUpdateUseCase(this.repository)
      const session = await useCase.exe(refreshToken)
      success(
        200,
        session.toJSON()
      )
    } catch (err: any) {
      error(
        err
      )
    }
  }

  private async delete (
    headers: any,
    success: SuccessfullResponse,
    error: UnsuccessfullResponse,
    useCase: SessionDeleteByRefreshTokenUseCase | SessionDeleteByAccessTokenUseCase
  ): Promise<void> {
    try {
      const token = SessionModel.extractTokenFromHeaders(headers)
      await useCase.exe(token)
      success(200)
    } catch (err: any) {
      error(
        err
      )
    }
  }

  public async deleteByRefreshToken (
    headers: any,
    success: SuccessfullResponse,
    error: UnsuccessfullResponse
  ): Promise<void> {
    const useCase = new SessionDeleteByRefreshTokenUseCase(this.repository)
    await this.delete(
      headers,
      success,
      error,
      useCase
    )
  }

  public async deleteByAccessToken (
    headers: any,
    success: SuccessfullResponse,
    error: UnsuccessfullResponse
  ): Promise<void> {
    const useCase = new SessionDeleteByAccessTokenUseCase(this.repository)
    await this.delete(
      headers,
      success,
      error,
      useCase
    )
  }
}
