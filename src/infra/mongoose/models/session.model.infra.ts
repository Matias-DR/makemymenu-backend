import { mongoDBBaseConnection } from 'adapters/databases'
import { REFRESH_TOKEN_EXPIRES_IN } from 'utils/constants.util'

import {
  Schema
} from 'mongoose'

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

export default mongoDBBaseConnection.model('Sessions', sessionModelScheme)
