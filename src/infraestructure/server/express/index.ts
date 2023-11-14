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

const PORT: number = parseInt(process.env.PORT ?? '3000')
const HOST: string = process.env.HOST ?? 'localhost'

// Start app
app
  .listen(PORT, HOST, () => {
    console.log(`Server is running on port ${PORT}.`)
  })
  .on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      throw Error('Error: address already in use')
    } else {
      throw Error(err)
    }
  })

export default app
