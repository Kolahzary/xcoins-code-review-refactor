import * as Joi from 'joi'

export const validationSchema = Joi.object({
  NODE_ENV: Joi
    .string()
    .valid('development', 'production', 'test')
    .default('development'),

  PORT: Joi.number().default(3000),

  DB_URL: Joi.string().default('mongodb://username:password@localhost:27017/?authSource=admin&readPreference=primary&ssl=false'),

  CORS_ORIGINS: Joi.string().default(27017),
})
