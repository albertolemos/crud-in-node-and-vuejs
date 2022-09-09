import * as Joi from 'joi'

export default Joi.object({
  ra: Joi.string().required().messages({
    'string.base': 'The ra field must be of type string.',
    'any.required': 'The ra field is required.',
  })
})
