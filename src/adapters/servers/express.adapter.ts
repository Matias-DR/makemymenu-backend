import RouterMongooseInfra from 'infra/express/router.mongoose.infra'

import express, {
  type Application
} from 'express'
import cors, { type CorsOptions } from 'cors'
import 'dotenv/config'

export class ExpressAdapter {
  private readonly _app: Application
  private readonly _router: RouterMongooseInfra
  private readonly SERVER_PORT: number = parseInt(process.env.EXPRESS_SERVER_PORT ?? '3000')
  private readonly SERVER_HOST: string = process.env.EXPRESS_SERVER_HOST ?? 'localhost'

  constructor () {
    this._app = express()
    this._router = new RouterMongooseInfra()
    this.configure()
    this.init()
  }

  get app (): Application {
    return this._app
  }

  get router (): RouterMongooseInfra {
    return this._router
  }

  private configure (): void {
    const corsOptions: CorsOptions = {
      origin: '*'
    }
    this.app.use(cors(corsOptions))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use('/api', this.router.main)
  }

  private init (): void {
    this.app
      .listen(this.SERVER_PORT, this.SERVER_HOST, () => {
        console.log(`Server is running on port ${this.SERVER_PORT}.`)
      })
      .on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
          throw Error('Error: address already in use')
        } else {
          throw Error(err)
        }
      })
  }
}

const adapter = new ExpressAdapter()
const app = adapter.app
export default app
