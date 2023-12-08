import { AuthRefreshTokenRenewalController } from 'controllers/auth'
import { type AuthRepository } from 'domain/repositories'
import { AuthRepositoryImplementation } from 'infraestructure/database/mongodb/implementations/repositories'
import type {
  Request,
  Response
} from 'express'

// Recibe refresh.
// Si está OK, devuelve ambos nuevos.
// Si expiró, renueva y devuelve ambos nuevos.
export default async function authRefreshTokenRenewalController (
  req: Request,
  res: Response
): Promise<void> {
  const repository: AuthRepository = new AuthRepositoryImplementation()
  const controller = new AuthRefreshTokenRenewalController(
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
