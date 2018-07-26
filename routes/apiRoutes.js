const axios = require("axios");
const router = require("express").Router();
const saveArticle = require('../controllers/article').saveArticle;
const saveNote = require('../controllers/note');
const deleteArticle = require('../controllers/article').deleteArticle;
const deleteNote = require('../controllers/note').deleteNote;
const viewSaved = require('../controllers/fetch').viewSaved;


router.get("/articles", (req, res) => {
  axios
    .get("https://api.nytimes.com/svc/search/v2/articlesearch.json", { params: req.query })
    .then((results) => res.json(results.data.response.docs))
    .catch(err => res.status(422).json(err));
});

router.post("/articles", saveArticle);

router.get("/saved", viewSaved);

//router.post("/articles/:id", saveNote);

//router.delete("/articles", deleteArticle);

//router.delete("/note", deleteNote);

module.exports = router;