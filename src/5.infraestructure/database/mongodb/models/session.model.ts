import {
  Schema,
  connection
} from 'mongoose'
import {
  REFRESH_TOKEN_EXPIRES_IN,
  MONGODB_URI,
  MONGODB_MAKEMYMENU_DB
} from '1.utils/constants.util'

const sessionModelScheme = new Schema({
  refreshToken: {
    type: String,
    required: true,
    unique: true
  },
  accessToken: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    expires: REFRESH_TOKEN_EXPIRES_IN,
    default: Date.now
  }
}, {
  timestamps: true,
  versionKey: false
})

connection.openUri(MONGODB_URI)
  .then(() => { })
  .catch(() => { })

const database = connection.useDb(MONGODB_MAKEMYMENU_DB)

export default database.model('Sessions', sessionModelScheme)
