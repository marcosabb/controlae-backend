import { Router } from 'express'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import DeviceController from './app/controllers/DeviceController'

import authMiddleware from './app/middlewares/auth'

const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.get('/devices', DeviceController.index)

routes.use(authMiddleware)

routes.post('/devices', DeviceController.store)
routes.put('/devices/:id', DeviceController.update)
routes.delete('/devices/:id', DeviceController.delete)

export default routes
