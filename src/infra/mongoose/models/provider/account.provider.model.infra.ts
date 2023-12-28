import { mongoDBProviderConnection } from 'adapters/databases'

import {
  Schema,
  Types
} from 'mongoose'

const { ObjectId } = Types

const providerAccountModelScheme = new Schema({
  userId: ObjectId,
  provider: String
})

export default mongoDBProviderConnection.model('Accounts', providerAccountModelScheme)
