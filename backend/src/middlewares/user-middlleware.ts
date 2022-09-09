import * as Joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import createUserValidator from '../validators/create-user-validator'
import userValidator from '../validators/get-user-validator'
import updateUserValidator from '../validators/update-user-validator'

const userMiddleware = (request: Request, response: Response, next: NextFunction) => {
  let middlewareError: Joi.ValidationError | undefined
  let message: string = ''

  if (request.method === 'POST') {
    const { error } = createUserValidator.validate(request.body)
    middlewareError = error
  } else if (request.method === 'PUT') {
    const { error } = updateUserValidator.validate(request.body)
    middlewareError = error
  } else if (request.method === 'DELETE') {
    const { error } = userValidator.validate(request.params)
    middlewareError = error
  }

  const valid = middlewareError == null

  if (valid) {
    next()
  } else {
    const details = middlewareError?.details
    if (details) {
      message = details.map(i => i.message).join(',')
    }

    response.status(422).json({ message, type: 'error' })
  }
}

export default userMiddleware
