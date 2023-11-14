import { userRouter } from './routes'
import express, { type Application } from 'express'
import cors, { type CorsOptions } from 'cors'
import 'dotenv'

const app: Application = express()

// Config sv
const corsOptions: CorsOptions = {
  origin: '*'
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/user', userRouter)

const EXPRESS_SERVER_PORT: number = parseInt(process.env.PORT ?? '3000')
const EXPRESS_SERVER_HOST: string = process.env.HOST ?? 'localhost'

// Start app
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
