import { mongoDBProviderConnection } from 'adapters/databases'

import { Schema } from 'mongoose'

const providerUserModelScheme = new Schema({ email: String })

export default mongoDBProviderConnection.model('Users', providerUserModelScheme)
