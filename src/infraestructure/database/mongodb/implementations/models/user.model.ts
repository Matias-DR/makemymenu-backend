import {
  Schema,
  model
} from 'mongoose'

class UserModelScheme {
  exe (): Schema {
    return new Schema(
      {
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
      },
      {
        timestamps: true,
        versionKey: false
      }
    )
  }
}

export default model('Users', new UserModelScheme().exe())
