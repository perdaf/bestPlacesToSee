const Joi = require("@hapi/joi");

module.exports = {
  registerValidation: data => {
    const schema = Joi.object().keys({
      name: Joi.string()
        .max(20)
        .required(),
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .min(6)
        .required(),
    });
    return schema.validate(data);
  },
  loginValidation: data => {
    const schema = Joi.object().keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .min(6)
        .required(),
    });
    return schema.validate(data);
  },
};
