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

  placeValidation: data => {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().uri(),
      rating: Joi.number()
        .min(0)
        .max(10)
        .default(0),
      latitude: Joi.number()
        .min(-90)
        .max(90)
        .required(),
      longitude: Joi.number()
        .min(-180)
        .max(180)
        .required(),
    });
    return schema.validate(data);
  },
};
