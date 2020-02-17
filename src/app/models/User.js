import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
})

UserSchema.pre('save', async function (next) {
  const user = this

  if (!user.isModified('password')) {
    return next()
  }

  if (user.password) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  return next()
})

UserSchema.methods.checkPassword = function (password) {
  const user = this

  return bcrypt.compare(password, user.password)
}

export default mongoose.model('User', UserSchema)
