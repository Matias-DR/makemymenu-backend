/* eslint-disable @typescript-eslint/no-misused-promises */

import { UserController } from 'controllers'
import { UserMongoDBRepositoryImplementation } from 'infraestructure/database/mongodb/implementations/repositories'
import { UserMongoDBAdapter } from 'adapters/mongodb'
import {
  type Request,
  type Response,
  Router
} from 'express'

const controller = new UserController(
  UserMongoDBRepositoryImplementation,
  UserMongoDBAdapter
)

const router = Router()

// AGREGAR MIDDLEWARES COMO PRIMERA ACCION PARA LA VERIFICACION DE TOKENS
router.patch(
  '/',
  async (req: Request, res: Response) => {
    await controller.update(req, res)
  }
) // ACTUALIZAR SESION CON MIDDLEWARE COMO ULTIMA ACCION DEVOLVIENDO NUEVOS TOKENS QUE CONTENDRAN ENTONCES LOS DATOS DEL USUARIO ACTUALIZADO

export default router
