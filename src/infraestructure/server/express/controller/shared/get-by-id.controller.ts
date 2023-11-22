import { type UserRepository } from 'domain/repositories'
import * as sharedControllers from 'controllers/shared'
import { UserRepositoryImplementation } from 'infraestructure/database/mongodb/implementations/repositories'
import type {
  Request,
  Response,
  NextFunction
} from 'express'

export default async function getByIdController (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const repository: UserRepository = new UserRepositoryImplementation()
  const controller = new sharedControllers.GetByIdController(
    repository,
    req.query
  )
  try {
    const result = await controller.exe()
    res.status(200).json(result)
  } catch (error: any) {
    res.status(500).json(error.message)
    // next(error.message)
  }
}
