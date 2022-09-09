import { Router, Request, Response } from 'express'

import UserController from './modules/users/controller/user-controller'
import userMiddleware from './middlewares/user-middlleware'

const routes = Router()
const userController = new UserController

routes.use('/api/v1', routes)
routes.get('/health', (request: Request, response: Response) =>
  response.status(200).json({
    name: 'API User Management',
    version: '1.0.0',
    online: true
  })
)

routes.post('/user', userMiddleware, userController.createUser)

routes.get('/users', userController.readAllUsers)

routes.get('/user/:ra', userMiddleware, userController.readUser)

routes.put('/user/:ra', userMiddleware, userController.updateUser)

routes.delete('/user/:ra', userMiddleware, userController.deleteUser)

export default routes
