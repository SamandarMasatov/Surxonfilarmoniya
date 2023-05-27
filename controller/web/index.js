const Projects = require("../../models/projects");
const Abouts = require("../../models/about");
const Audios = require("../../models/audios");
const News = require("../../models/news");
const Team = require("../../models/team");
const TeamAbout = require("../../models/teamAbout");
const Articles = require("../../models/article");
const Home = require("../../models/home");

exports.index = async (req, res) => {
  const projects = await Projects.find().sort({ date: -1 });
  const audios = await Audios.find().sort({ createdAt: -1 });
  const news = await News.find().sort({ createdAt: -1 });
  const teams = await Team.find();
  const teamAbout = await TeamAbout.find();
  const articles = await Articles.find().sort({ createdAt: -1 });
  const abouts = await Abouts.find();
  const home = await Home.find().sort({ createdAt: -1 });
  res.render("./web/index", {
    title: "Surxondaryo viloyat davlat Filarmoniyasi",
    layout: "./web_layout",
    projects,
    abouts,
    audios,
    news,
    teams,
    articles,
    teamAbout,
    home,
  });
};

exports.projects = async (req, res) => {
  const projects = await Projects.find().sort({ date: -1 });
  res.render("./web/projects", {
    title: "Suv tozalash inshootlari: xususiyatlari, tozalash va afzalliklari",
    layout: "./web/projects",
    lang: req.session.ulang,
    projects,
  });
};

exports.projectsru = async (req, res) => {
  const projects = await Projects.find().sort({ date: -1 });
  res.render("./web/projectsru", {
    title:
      "Что такое очистные сооружения, принцип работы | Stroy montaj invest",
    layout: "./web/projectsru",
    lang: req.session.ulang,
    projects,
  });
};

exports.contact = async (req, res) => {
  res.render("./web/contact", {
    title: "Suv tozalash inshootlari | Stroy montaj invest",
    layout: "./web_layout",
    lang: req.session.ulang,
  });
};

exports.projectOne = async (req, res) => {
  const result = await Projects.findById({ _id: req.params.id });
  res.render("./web/article_one", {
    title: "Filarmoniya Maqolalar",
    layout: "./web_layout",
    result,
  });
};

exports.newsOne = async (req, res) => {
  const result = await News.findById({ _id: req.params.id });
  res.render("./web/news_one", {
    title: "Suv tozalash inshootlari | Stroy montaj invest",
    layout: "./web_layout",
    result,
  });
};

exports.servicesOne = async (req, res) => {
  const result = await Services.findById({ _id: req.params.id });
  const teams = await Team.find().sort({ date: -1 });
  res.render("./web/services_one", {
    title: "Suv tozalash inshootlari | Stroy montaj invest",
    layout: "./web_layout",
    result,
    teams,
  });
};

exports.teamOne = async (req, res) => {
  const result = await Team.findById({ _id: req.params.id });
  res.render("./web/team_one", {
    title: "Suv tozalash inshootlari | Stroy montaj invest",
    layout: "./web_layout",
    result,
  });
};
exports.errorMessage = async (req, res) => {
  res.render("./web/errorMessage", {
    title: "Suv tozalash inshootlari | Stroy montaj invest",
    layout: "./web_layout",
  });
};
