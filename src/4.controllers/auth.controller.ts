import type {
  AuthRepository,
  UserRepository
} from '0.domain/repositories'
import type { AuthAdapter } from '5.adapters'

export default class AuthController {
  private readonly authRepository: AuthRepository
  private readonly userRepository: UserRepository
  private readonly adapter: AuthAdapter

  constructor (
    AuthRepository: new () => AuthRepository,
    UserRepository: new () => UserRepository,
    Adapter: new (
      authRepository: AuthRepository,
      userRepository: UserRepository
    ) => AuthAdapter
  ) {
    this.authRepository = new AuthRepository()
    this.userRepository = new UserRepository()
    this.adapter = new Adapter(
      this.authRepository,
      this.userRepository
    )
  }

  async signIn (
    req: any,
    res: any,
    next: () => void
  ): Promise<void> {
    try {
      const result = await this.adapter.signIn(req.body)
      req.body = result
      next()
      // res.status(200).json(result)
    } catch (error: any) {
      res.status(error.code).json(error.spanishMessage)
    }
  }

  async signUp (
    req: any,
    res: any
  ): Promise<void> {
    try {
      await this.adapter.signUp(req.body)
      res.status(200).json()
    } catch (error: any) {
      res.status(error.code).json(error.spanishMessage)
    }
  }
}
