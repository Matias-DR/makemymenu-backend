import { AuthAccessTokenRenewalController } from 'controllers/auth'
import { type AuthRepository } from 'domain/repositories'
import { AuthRepositoryImplementation } from 'infraestructure/database/mongodb/implementations/repositories'
import type {
  Request,
  Response
} from 'express'

// Recibe refresh y access.
// Si están OK, devuelve access.
export default async function authAccessTokenRenewalController (
  req: Request,
  res: Response
): Promise<void> {
  const repository: AuthRepository = new AuthRepositoryImplementation()
  const controller = new AuthAccessTokenRenewalController(
    repository,
    req.body
  )
  try {
    const result = await controller.execute()
    res.status(200).json(result)
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}
