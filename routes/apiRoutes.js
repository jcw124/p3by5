const router = require("express").Router();

const pleasegodlogin = require('../serverAPI/user').pleasegodlogin;
const getUserbyUsernamePass = require('../serverAPI/user').getUserbyUsernamePass;
const getUser = require('../serverAPI/user').getUser;
const saveUser = require('../serverAPI/user').saveUser;
const updateUser = require('../serverAPI/user').updateUser;
const deleteUser = require('../serverAPI/user').deleteUser;

const adminLogin = require('../serverAPI/admin').adminLogin;
const getAdminbyUsername = require('../serverAPI/admin').getAdminbyUsername;
const getAdmin = require('../serverAPI/admin').getAdmin;
const saveAdmin = require('../serverAPI/admin').saveAdmin;
const updateAdmin = require('../serverAPI/admin').updateAdmin;
const deleteAdmin = require('../serverAPI/admin').deleteAdmin;
const getAllAdmins = require('../serverAPI/admin').getAllAdmins;
const getGamesbyAdminID = require('../serverAPI/admin').getGamesbyAdminID;
const getUsersbyAdminID = require('../serverAPI/admin').getUsersbyAdminID;

const getGame = require('../serverAPI/game').getGame;
const saveGame = require('../serverAPI/game').saveGame;
const updateGame = require('../serverAPI/game').updateGame;
const deleteGame = require('../serverAPI/game').deleteGame;
const getQuestionsbyGameID = require('../serverAPI/game').getQuestionsbyGameID;
const getScoresbyGameID = require('../serverAPI/game').getScoresbyGameID;

const getQuestion = require('../serverAPI/question').getQuestion;
const saveQuestion = require('../serverAPI/question').saveQuestion;
const updateQuestion = require('../serverAPI/question').updateQuestion;
const deleteQuestion = require('../serverAPI/question').deleteQuestion;

const getScores = require('../serverAPI/score').getScores;
const saveScore = require('../serverAPI/score').saveScore;
const deleteScore = require('../serverAPI/score').deleteScore;

router.get("/get/user/login/", getUserbyUsernamePass);
router.post("/user/login", pleasegodlogin);
router.get("/get/user/:username", getUser);
router.put("/user", saveUser);
router.post("/user", updateUser);
router.delete("/delete/user/:id", deleteUser);

router.post("/admin/login", adminLogin);
router.get("/get/admin/login", getAdminbyUsername);
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