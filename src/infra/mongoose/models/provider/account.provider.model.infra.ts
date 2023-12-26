import { mongoDBProviderConnection } from 'adapters/databases'

import { Schema } from 'mongoose'

const providerAccountModelScheme = new Schema({ userId: String })

export default mongoDBProviderConnection.model('Accounts', providerAccountModelScheme)
