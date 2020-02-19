import mongoose from 'mongoose'

const DeviceSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    select: false
  },

  order: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },

  brand: {
    type: String,
    required: true
  },

  control: {
    type: Map,
    of: String,
    required: true
  }
})

export default mongoose.model('Device', DeviceSchema)
