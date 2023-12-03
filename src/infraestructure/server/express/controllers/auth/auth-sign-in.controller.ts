import { type UserRepository } from 'domain/repositories'
import { AuthSignInController } from 'controllers/auth'
import { UserRepositoryImplementation } from 'infraestructure/database/mongodb/implementations/repositories'
import type {
  Request,
  Response
} from 'express'

export default async function userSignInController (
  req: Request,
  res: Response
): Promise<void> {
  const repository: UserRepository = new UserRepositoryImplementation()
  const controller = new AuthSignInController(
    repository,
    req.body
  )
  try {
    const result = await controller.exe()
    res.status(200).json(result)
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}
