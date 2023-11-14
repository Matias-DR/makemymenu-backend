import { type UserRepository } from 'domain/repositories'
import * as userControllers from 'controllers/user'
import { UserRepositoryImplementation } from 'infraestructure/database/mongodb/implementations/repositories'
import type {
  Request,
  Response,
  NextFunction
} from 'express'

export default async function userDeleteByIdController (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const repository: UserRepository = new UserRepositoryImplementation()
  const controller = new userControllers.UserDeleteByIdController(
    repository,
    req.query
  )
  try {
    const result = await controller.exe()
    res.json(result)
  } catch (error: any) {
    next(error.message)
  }
}
