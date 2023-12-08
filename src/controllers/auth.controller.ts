import type {
  AuthRepository,
  UserRepository
} from 'domain/repositories'
import { Controller } from '.'
import type { AuthAdapter } from 'adapters'

export default class AuthController extends Controller {
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
    super()
    this.authRepository = new AuthRepository()
    this.userRepository = new UserRepository()
    this.adapter = new Adapter(
      this.authRepository,
      this.userRepository
    )
  }

  async signIn (
    req: any,
    res: any
  ): Promise<void> {
    await this.resolve(
      this.adapter.signIn,
      req.body,
      res
    )
  }

  async signUp (
    req: any,
    res: any
  ): Promise<void> {
    await this.resolve(
      this.adapter.signUp,
      req.body,
      res
    )
  }
}
