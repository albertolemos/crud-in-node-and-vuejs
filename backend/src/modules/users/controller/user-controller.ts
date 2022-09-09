import { Request, Response } from "express"
import UserService from '../service/user-service'

const userService = new UserService

class UserController {
  async createUser(request: Request, response: Response): Promise<any> {
    response.status(201).send(await userService.createUser(request.body))
  }

  async readAllUsers(request: Request, response: Response): Promise<any> {
    response.status(200).send(await userService.readAllUsers())
  }

  async readUser(request: Request, response: Response): Promise<any> {
    response.status(200).send(await userService.readUser(request.params.ra.toString()))
  }

  async updateUser(request: Request, response: Response): Promise<any> {
    response.status(200).send(await userService.updateUser(request.params.ra.toString(), request.body))
  }

  async deleteUser(request: Request, response: Response): Promise<any> {
    response.status(200).send(await userService.deleteUser(request.params.ra.toString()))
  }
}

export default UserController
