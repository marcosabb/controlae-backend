import * as Yup from 'yup'

import User from '../models/User'

class UserController {
  async store (req, res) {
    const { email, password } = req.body

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required()
    })

    if (!(await schema.isValid({ email, password }))) {
      return res.status(400).json({ error: 'Validation failed' })
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const user = await User.create({ email, password })

    return res.json(user)
  }
}

export default new UserController()
