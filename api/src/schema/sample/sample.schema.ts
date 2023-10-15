const Joi = require('joi');

export const createSampleSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
});
