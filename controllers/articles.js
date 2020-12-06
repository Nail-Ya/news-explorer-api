const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const getAllSavedArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      res
        .status(200)
        .send({ data: articles });
    })

    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => {
      res
        .status(200)
        .send({
          keyword: article.keyword,
          title: article.title,
          text: article.text,
          date: article.date,
          source: article.source,
          link: article.link,
          image: article.image,
        });
    })

    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new BadRequestError(`${error.message}`);
      }

      throw error;
    })

    .catch(next);
};

const removeArticle = (req, res, next) => {
  Article.findById(req.params.id)
    .populate('owner')
    .orFail(new NotFoundError('В базе данных нет статьи с таким id'))
    .then((article) => {
      if (article.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав для выполнения операции');
      }

      Article.findByIdAndRemove(req.params.id)
        .then((articleForRemove) => {
          res
            .status(200)
            .send(articleForRemove);
        })

        .catch(next);
    })

    .catch(next);
};

module.exports = {
  getAllSavedArticles,
  createArticle,
  removeArticle,
};
