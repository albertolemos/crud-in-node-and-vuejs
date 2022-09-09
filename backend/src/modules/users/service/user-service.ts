import AppError from "../../../error/AppError"
import { IUser } from "../../../interfaces/IUser"
import UserRepository from '../repository/user-repository'

const userRepository = new UserRepository()

class UserService {
  async createUser(user: IUser): Promise<boolean> {
    const existingUser = await userRepository.readUser(user.ra)
    if (existingUser.length) throw new AppError('User already', 400)
    return await userRepository.createUser(user.name, user.email, user.ra, user.cpf)
  }

  async readAllUsers(): Promise<any[]> {
    return await userRepository.readAllUsers()
  }

  async readUser(userId: string): Promise<any> {
    return await userRepository.readUser(userId)
  }

  async updateUser(userId: string, user: IUser): Promise<any> {
    const existingUser = await userRepository.readUser(userId)
    if (!existingUser.length) throw new AppError('User not found', 404)
    return await userRepository.updateUser(userId, user)
  }

  async deleteUser(ra: string): Promise<any> {
    const existingUser = await userRepository.readUser(ra)
    if (!existingUser.length) throw new AppError('User not found', 404)
    return await userRepository.deleteUser(ra)
  }
}

export default UserService