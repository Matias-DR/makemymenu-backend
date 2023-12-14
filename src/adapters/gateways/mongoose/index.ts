import { UnsuccessfulOperationException } from 'domain/exceptions/operation.exceptions'
import mongoose from 'mongoose'
import 'dotenv/config'

if (process.env.MONGODB_URI === null || process.env.MONGODB_URI === undefined) {
  throw new UnsuccessfulOperationException()
}
const uri = process.env.MONGODB_URI

const connection = mongoose.connect(uri)

export default connection
