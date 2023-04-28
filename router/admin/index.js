const express = require('express'); 
const router = express.Router()
const adminIndex = require('../../controller/admin/index');
 
const { isAuth, isAuth_Admin } = require("../../middleware/isAuth");

router.get("/", isAuth_Admin, adminIndex.index); 
router.get("/projects_add", isAuth_Admin, adminIndex.projectsAdd); 
router.get("/projects", isAuth_Admin, adminIndex.projects);  
router.get("/services_add", isAuth_Admin, adminIndex.services_add); 
router.get("/services", isAuth_Admin, adminIndex.services); 
router.get("/about_add", isAuth_Admin, adminIndex.aboutAdd); 
router.get("/abouts", isAuth_Admin, adminIndex.abouts);  
router.get("/team_add", isAuth_Admin, adminIndex.teamAdd); 
router.get("/team", isAuth_Admin, adminIndex.teams);  
router.get("/article_add", isAuth_Admin, adminIndex.articleAdd); 
router.get("/articles", isAuth_Admin, adminIndex.articles);  
router.get("/message", isAuth_Admin, adminIndex.message);  
router.get('/login', adminIndex.login);

module.exports = router;