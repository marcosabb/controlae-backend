import mongoose from 'mongoose'

class Database {
  constructor () {
    this.init()
  }

  init () {
    this.connection = mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true
    })
  }
}

export default new Database()
