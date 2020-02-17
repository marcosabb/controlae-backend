import jwt from 'jsonwebtoken'
import * as Yup from 'yup'

import User from '../models/User'

import authConfig from '../../config/auth'

class SessionController {
  async store (req, res) {
    const { email, password } = req.body

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required()
    })

    if (!(await schema.isValid({ email, password }))) {
      return res.status(400).json({ error: 'Validation failed' })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Authentication failed' })
    }

    const { _id } = user

    return res.json({
      user: {
        _id
      },
      token: jwt.sign({ _id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    })
  }
}

export default new SessionController()
