import Joi from "joi";

const registerValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
  name: Joi.string().max(100).required(),
  role: Joi.string().optional(),
  detak_jantung: Joi.string().max(20).required(),
  kelembapan_kulit: Joi.string().max(20).required(),
  tanggal: Joi.date().iso().required(),
});

const getValidation = Joi.string().max(100).required();

const updateValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).optional(),
  name: Joi.string().max(100).optional(),
});

const updateDataUserValidation = Joi.object({
  id: Joi.number().integer().positive().required(),
  detak_jantung: Joi.string().max(20).required(),
  kelembapan_kulit: Joi.string().max(20).required(),
  tanggal: Joi.date().iso().required(),
});

export {
  registerValidation,
  getValidation,
  updateValidation,
  updateDataUserValidation,
};
