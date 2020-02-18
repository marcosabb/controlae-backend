import { Router } from 'express'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ClientController from './app/controllers/ClientController'
import DashboardController from './app/controllers/DashboardController'

import authMiddleware from './app/middlewares/auth'

const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.get('/client/devices', ClientController.index)

routes.use(authMiddleware)

routes.get('/dashboard/devices', DashboardController.index)
routes.post('/dashboard/devices', DashboardController.store)
routes.put('/dashboard/devices/:id', DashboardController.update)
routes.delete('/dashboard/devices/:id', DashboardController.delete)

export default routes
