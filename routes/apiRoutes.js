const router = require("express").Router();

const getUserbyUsernamePass = require('../controllers/user').getUserbyUsernamePass;
const getUser = require('../controllers/user').getUser;
const saveUser = require('../controllers/user').saveUser;
const updateUser = require('../controllers/user').updateUser;
const deleteUser = require('../controllers/user').deleteUser;

const getAdminbyUsernamePass = require('../controllers/admin').getAdminbyUsernamePass;
const getAdmin = require('../controllers/admin').getAdmin;
const saveAdmin = require('../controllers/admin').saveAdmin;
const updateAdmin = require('../controllers/admin').updateAdmin;
const deleteAdmin = require('../controllers/admin').deleteAdmin;
const getAllAdmins = require('../controllers/admin').getAllAdmins;
const getGamesbyAdminID = require('../controllers/admin').getGamesbyAdminID;
const getUsersbyAdminID = require('../controllers/admin').getUsersbyAdminID;

const getGame = require('../controllers/game').getGame;
const saveGame = require('../controllers/game').saveGame;
const updateGame = require('../controllers/game').updateGame;
const deleteGame = require('../controllers/game').deleteGame;
const getQuestionsbyGameID = require('../controllers/game').getQuestionsbyGameID;
const getScoresbyGameID = require('../controllers/game').getScoresbyGameID;

const getQuestion = require('../controllers/question').getQuestion;
const saveQuestion = require('../controllers/question').saveQuestion;
const updateQuestion = require('../controllers/question').updateQuestion;
const deleteQuestion = require('../controllers/question').deleteQuestion;

const getScores = require('../controllers/score').getScores;
const saveScore = require('../controllers/score').saveScore;
const deleteScore = require('../controllers/score').deleteScore;

router.get("/get/user/login", getUserbyUsernamePass);
router.get("/get/user/:id", getUser);
router.put("/user", saveUser);
router.post("/user", updateUser);
router.delete("/delete/user/:id", deleteUser);

router.get("/get/admin/login", getAdminbyUsernamePass);
router.get("/get/admin/:id", getAdmin);
router.put("/admin", saveAdmin);
router.post("/admin", updateAdmin);
router.delete("/delete/admin/:id", deleteAdmin);
router.get("/get/admin", getAllAdmins);
router.get("/admin/games/:id", getGamesbyAdminID);
router.get("/admin/users/:id", getUsersbyAdminID);

router.get("/get/game/:id", getGame);
router.put("/game", saveGame);
router.post("/game", updateGame);
router.delete("/delete/game/:id", deleteGame);
router.get("/game/questions/:id", getQuestionsbyGameID);
router.get("/game/scores/:id", getScoresbyGameID);

router.get("/get/question/:id", getQuestion);
router.put("/question", saveQuestion);
router.post("/question", updateQuestion);
router.delete("/delete/question/:id", deleteQuestion);

router.get("/get/score", getScores);
router.put("/score", saveScore);
router.delete("/delete/score/:id", deleteScore);

module.exports = router;