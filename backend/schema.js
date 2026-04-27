const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(1),
        image: Joi.allow("", null),
    }).required()
})

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number()
      .min(1)
      .max(5)
      .required()
      .messages({
        "number.base": "Please select a rating",
        "any.required": "Rating is required"
      }),

    comment: Joi.string()
      .trim()
      .required()
      .messages({
        "string.empty": "Comment cannot be empty",
        "any.required": "Comment is required"
      })
  }).required()
});