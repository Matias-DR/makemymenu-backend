import {
  type AuthRepository,
  type UserRepository
} from 'domain/repositories'
import { AuthSignUpController } from 'controllers/auth'
import {
  AuthRepositoryImplementation,
  UserRepositoryImplementation
} from 'infraestructure/database/mongodb/implementations/repositories'
import type {
  Request,
  Response
} from 'express'

export default async function signUpController (
  req: Request,
  res: Response
): Promise<void> {
  const authRepository: AuthRepository = new AuthRepositoryImplementation()
  const userRepository: UserRepository = new UserRepositoryImplementation()
  const controller = new AuthSignUpController(
    authRepository,
    userRepository,
    req.body
  )
  try {
    const result = await controller.exe()
    res.status(200).json(result)
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}
