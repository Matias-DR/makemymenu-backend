import { mongoDBBaseConnection } from 'adapters/databases'

import { Schema } from 'mongoose'

const userModelScheme = new Schema({
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password required']
  }
}, {
  timestamps: true,
  versionKey: false
})

export default mongoDBBaseConnection.model('Users', userModelScheme)
