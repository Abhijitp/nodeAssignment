import BaseJoi from 'joi';
import sanitizeHtml from 'sanitize-html';

const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.escapeHTML': '{{#label}} must not include HTML!',
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value) return helpers.error('string.escapeHTML', { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

export const eventSchema = Joi.object({
  title: Joi.string().required().escapeHTML(),
  body: Joi.string().required().escapeHTML(),
});

export const userSchema = Joi.object({
  firstName: Joi.string().required().escapeHTML(),
  lastName: Joi.string().required().escapeHTML(),
  email: Joi.string().required().escapeHTML(),
  password: Joi.string().required().escapeHTML(),
});
