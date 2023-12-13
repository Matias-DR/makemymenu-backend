import {
  Schema,
  connection
} from 'mongoose'
import 'dotenv/config'

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

connection.openUri(process.env.MONGODB_URI as string)
  .then(() => { })
  .catch(() => { })

const database = connection.useDb(process.env.MONGODB_SELECTED_DB as string)

export default database.model('Users', userModelScheme)
