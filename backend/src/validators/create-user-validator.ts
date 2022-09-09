import * as Joi from 'joi'

export default Joi.object({
  name: Joi.string().required().max(100).messages({
    'string.base': 'The name field must be of type string.',
    'any.required': 'The name field is required.',
    'string.max': 'The name field exceeds the 100-character limit.'
  }),
  email: Joi.string().required().email().messages({
    'string.base': 'The email field must be of type string.',
    'any.required': 'The email field is required.',
  }),
  ra: Joi.string().required().messages({
    'string.base': 'The ra field must be of type string.',
    'any.required': 'The ra field is required.',
  }),
  cpf: Joi.string().required().length(14).messages({
    'string.base': 'The cpf field must be of type string.',
    'any.required': 'The cpf field is required.',
    'string.length': 'The cpf field must be 14 characters.',
  })
})
