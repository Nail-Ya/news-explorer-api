const articlesRouter = require('express').Router();
const { getAllSavedArticles, createArticle, removeArticle } = require('../controllers/articles');
const { validateId, validateArticle } = require('../middlewares/requestValidation');

articlesRouter.get('/articles', getAllSavedArticles);
articlesRouter.post('/articles', validateArticle, createArticle);
articlesRouter.delete('/articles/:id', validateId, removeArticle);

module.exports = articlesRouter;
