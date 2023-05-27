const Home = require("../../models/home");
const Abouts = require("../../models/about");
const Audios = require("../../models/audios");
const News = require("../../models/news");
const Teams = require("../../models/team");
const TeamAbout = require("../../models/teamAbout");
const Article = require("../../models/article");
const Message = require("../../models/contact");

exports.index = async (req, res) => {
  res.render("./admin/index", {
    title: "Surxonfilarmoniya Boshqaruv paneli",
    layout: "./admin_layout",
  });
};

exports.projectsAdd = async (req, res) => {
  res.render("./admin/project_add", {
    title: "Surxonfilarmoniya Loyiha qo'shihs",
    layout: "./admin_layout",
  });
};
exports.projects = async (req, res) => {
  const home = await Home.find().sort({ createdAt: -1 });
  res.render("./admin/projects", {
    title: "Bosh sahifaga qo'shiq yuklash",
    layout: "./admin_layout",
    home,
  });
};
exports.services_add = async (req, res) => {
  res.render("./admin/services_add", {
    title: "Qo'shiqlar qo'shish",
    layout: "./admin_layout",
  });
};
exports.services = async (req, res) => {
  const audios = await Audios.find().sort({ createdAt: -1 });
  res.render("./admin/services", {
    title: "Qushiqlar",
    layout: "./admin_layout",
    audios,
  });
};

exports.aboutAdd = async (req, res) => {
  res.render("./admin/about_add", {
    title: "Kompanya haqida",
    layout: "./admin_layout",
  });
};
exports.abouts = async (req, res) => {
  const abouts = await Abouts.find().sort({ date: -1 });
  res.render("./admin/abouts", {
    title: "Kompanya haqida",
    layout: "./admin_layout",
    abouts,
  });
};
exports.teamAdd = async (req, res) => {
  res.render("./admin/team_add", {
    title: "Jamoa qo'shish",
    layout: "./admin_layout",
  });
};
exports.teams = async (req, res) => {
  const teams = await Teams.find().sort({ date: -1 });
  const teamsAbout = await TeamAbout.find();
  res.render("./admin/teams", {
    title: "Jamoa a'zolari haqida",
    layout: "./admin_layout",
    teams,
    teamsAbout,
  });
};
exports.articleAdd = async (req, res) => {
  res.render("./admin/article_add", {
    title: "Maqola qo'shish",
    layout: "./admin_layout",
  });
};
exports.articles = async (req, res) => {
  const articles = await Article.find().sort({ date: -1 });
  res.render("./admin/articles", {
    title: "Maqollar haqida",
    layout: "./admin_layout",
    articles,
  });
};
exports.message = async (req, res) => {
  const message = await Message.find().sort({ date: -1 });
  res.render("./admin/message", {
    title: "Xabarlar",
    layout: "./admin_layout",
    message,
  });
};
exports.login = async (req, res, next) => {
  res.render("./admin/login", {
    title: "Boshqaruv paneliga kirish",
    layout: "./login",
  });
};
