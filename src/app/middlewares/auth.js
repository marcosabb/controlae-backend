import jwt from 'jsonwebtoken'
import { promisify } from 'util'

import authConfig from '../../config/auth'

export default async (req, res, next) => {
  const authorization = req.headers.authorization

  if (!authorization) {
    return res.status(401).json({ error: 'Token was not provided' })
  }

  const [, token] = authorization.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)

    req.user = decoded._id
  } catch (error) {
    return res.status(401).json('Invalid token')
  }
}
