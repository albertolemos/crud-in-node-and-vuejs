import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'

import routes from './routes'
import AppError from './error/AppError'
import db from './dbConfig/dbConnector'

const PORT = 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(routes)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  return response.status(400).json({
    status: 'error',
    message: 'Invalid Request!',
  })
})

db.pool.connect(error => {
  if (error) {
    return console.error('could not connect to DB', error)
  }
  console.log('DB connected successfuly')
})

app.listen(PORT, () => console.log(`API is running at http://localhost:${PORT}/api/v1`))
