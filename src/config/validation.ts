import * as Joi from 'joi'

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  PORT: Joi.number().default(3000),

  MONGO_URI: Joi.string().default('mongodb://localhost:27017/xcoins'),

  CORS_ORIGINS: Joi.string().default(27017),
})
