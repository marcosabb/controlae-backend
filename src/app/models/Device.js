import mongoose from 'mongoose'

const DeviceSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },

  gradient: {
    type: [String],
    required: true
  }
})

export default mongoose.model('Device', DeviceSchema)
