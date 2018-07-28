const router = require("express").Router();
const getUser = require('../controllers/user').getUser;
const saveUser = require('../controllers/user').saveUser;
const deleteUser = require('../controllers/user').deleteUser;
const getAdmin = require('../controllers/admin').getAdmin;
const saveAdmin = require('../controllers/admin').saveAdmin;
const deleteAdmin = require('../controllers/admin').deleteAdmin;
const getGame = require('../controllers/game').getGame;
const saveGame = require('../controllers/game').saveGame;
const deleteGame = require('../controllers/game').deleteGame;
const getQuestionIDs = require('../controllers/game').getQuestionIDs;
const getScoreIDs = require('../controllers/game').getQuestionIDs;
const getQuestion = require('../controllers/question').getQuestion;
const saveQuestion = require('../controllers/question').saveQuestion;
const deleteQuestion = require('../controllers/question').deleteQuestion;
const getScore = require('../controllers/score').getScore;
const saveScore = require('../controllers/score').saveScore;
const deleteScore = require('../controllers/score').deleteScore;


router.get("/user", getUser);

router.post("/user", saveUser);

router.post("/delete/user", deleteUser);

router.get("/admin", getAdmin);

router.post("/admin", saveAdmin);

router.post("/delete/admin", deleteAdmin);

router.get("/game", getGame);

router.post("/game", saveGame);

router.post("/delete/game", deleteGame);

router.get("/game/questions",getQuestionIDs);

router.get("/game/scores",getScoreIDs);

router.get("/question", getQuestion);

router.post("/question/:gameID", saveQuestion);

router.post("/delete/question", deleteQuestion);

router.get("/score", getScore);

router.post("/score/:gameID", saveScore);

router.post("/delete/score", deleteScore);

module.exports = router;