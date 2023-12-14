import router from './routers'
import express, { type Application } from 'express'
import cors, { type CorsOptions } from 'cors'
import 'dotenv/config'

const app: Application = express()

const corsOptions: CorsOptions = {
  origin: '*'
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)

const EXPRESS_SERVER_PORT: number = parseInt(process.env.EXPRESS_SERVER_PORT ?? '3000')
const EXPRESS_SERVER_HOST: string = process.env.EXPRESS_SERVER_HOST ?? 'localhost'

app
  .listen(EXPRESS_SERVER_PORT, EXPRESS_SERVER_HOST, () => {
    console.log(`Server is running on port ${EXPRESS_SERVER_PORT}.`)
  })
  .on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      throw Error('Error: address already in use')
    } else {
      throw Error(err)
    }
  })

export default app
