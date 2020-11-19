const { celebrate, Joi } = require('celebrate');

// схема валидации статьи
const validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required()
      .messages({
        'string.base': 'Поле с ключевым словом, по которому ищутся статьи должно быть записано в виде строки',
        'string.empty': 'Поле с ключевым словом, по которому ищутся статьи должно быть заполнено',
      }),
    title: Joi.string().required()
      .messages({
        'string.base': 'Поле с заголовком статьи должно быть записано в виде строки',
        'string.empty': 'Поле с заголовком статьи должно быть заполнено',
      }),
    text: Joi.string().required()
      .messages({
        'string.base': 'Поле с текстом статьи должно быть записано в виде строки',
        'string.empty': 'Поле с текстом статьи должно быть заполнено',
      }),
    date: Joi.string().required()
      .messages({
        'string.base': 'Поле с датой статьи должно быть записано в виде строки',
        'string.empty': 'Поле с датой статьи должно быть заполнено',
      }),
    source: Joi.string().required()
      .messages({
        'string.base': 'Поле с источником статьи должно быть записано в виде строки',
        'string.empty': 'Поле с источником статьи должно быть заполнено',
      }),
    link: Joi.string().required().uri()
      .messages({
        'string.base': 'Поле с ссылкой на статью должно быть записано в виде строки',
        'string.empty': 'Поле с ссылкой на статью должно быть заполнено',
        'string.uri': 'Ведена неправильная ссылка',
      }),
    image: Joi.string().required().uri()
      .messages({
        'string.base': 'Поле с ссылкой на иллюстрацию к статье должно быть записано в виде строки',
        'string.empty': 'Поле с ссылкой на иллюстрацию к статье должно быть заполнено',
        'string.uri': 'Ведена неправильная ссылка',
      }),
  }),
});

// схема валидации id
const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex()
      .messages({
        'string.base': 'Поле идентификатора должно быть записано в виде строки',
        'string.empty': 'Поле идентификатора должно быть заполнено',
        'string.length': 'Поле идентификатора должно содержать 24 символа',
        'string.hex': 'Поле идентификатора должно быть заполнено в виде hex-последовательности',
      }),
  }),
});

// схема валидации пользователя при его создании
const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.base': 'Поле электронной почты должно быть записано в виде строки',
        'string.empty': 'Поле электронной почты должно быть заполнено',
        'string.email': 'Поле электронной почты должно быть правильным адресом электронной почты',
      }),
    password: Joi.string().required().min(5)
      .messages({
        'string.base': 'Поле с паролем должно быть записано в виде строки',
        'string.empty': 'Поле с паролем должно быть заполнено',
        'string.min': 'Поле с паролем должно содержать более 4 символов',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.base': 'Поле с именем должно быть записано в виде строки',
        'string.empty': 'Поле с именем должно быть заполнено',
        'string.min': 'Поле с именем должно содержать более 1 символа',
        'string.max': 'Поле с именем должно содержать не более 30 символов',
      }),
  }),
});

// схема валидации при входе пользователя в приложение
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.base': 'Поле электронной почты должно быть записано в виде строки',
        'string.empty': 'Поле электронной почты должно быть заполнено',
        'string.email': 'Поле электронной почты должно быть правильным адресом электронной почты',
      }),
    password: Joi.string().required().min(5)
      .messages({
        'string.base': 'Поле с паролем должно быть записано в виде строки',
        'string.empty': 'Поле с паролем должно быть заполнено',
        'string.min': 'Поле с паролем должно содержать более 4 символов',
      }),
  }),
});

module.exports = {
  validateArticle,
  validateId,
  validateUser,
  validateLogin,
};
