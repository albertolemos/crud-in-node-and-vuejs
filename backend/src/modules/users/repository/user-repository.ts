import db from '../../../dbConfig/dbConnector'
import { IUser } from '../../../interfaces/IUser'
import AppError from '../../../error/AppError'

class UserRepository {

  async createUser(name: string, email: string, ra: string, cpf: string): Promise<boolean> {
    try {
      const sql = `INSERT INTO "public"."user" (name, email, ra, cpf) VALUES ($1, $2, $3, $4)`
      await db.pool.query(sql, [name, email, ra, cpf])
      return true
    } catch (error) {
      throw new AppError(`${error}`, 400)
    }
  }

  async readAllUsers(): Promise<any[]> {
    try {
      const sql = `SELECT * FROM "public"."user"`
      const { rows } = await db.pool.query(sql)
      return rows
    } catch (error) {
      throw new AppError(`${error}`, 400)
    }
  }

  async readUser(ra: string): Promise<any> {
    try {
      const sql = `SELECT * FROM "public"."user" WHERE ra = $1`
      const { rows } = await db.pool.query(sql, [ra])
      return rows
    } catch (error) {
      throw new AppError(`${error}`, 400)
    }
  }

  async updateUser(ra: string, user: IUser): Promise<boolean> {
    try {
      const sql = `UPDATE "public"."user" SET name = $1, email = $2 WHERE ra = $3;`
      await db.pool.query(sql, [user.name, user.email, ra])
      return true
    } catch (error) {
      throw new AppError(`${error}`, 400)
    }
  }

  async deleteUser(ra: string): Promise<boolean> {
    try {
      const sql = `DELETE FROM "public"."user" WHERE ra = $1;`
      await db.pool.query(sql, [ra])
      return true
    } catch (error) {
      throw new AppError(`${error}`, 400)
    }
  }
}

export default UserRepository