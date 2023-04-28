const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const i18n = require("i18n-express");
const sessionValues = require("./config/sesion");
const MongoDBSession = require("connect-mongodb-session")(session);
const MongoURI = "mongodb://localhost:27017/Stroy_montaj";

mongoose
  .connect(MongoURI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Mongodb is running`);
  });
const store = new MongoDBSession({
  uri: MongoURI,
  collection: "MYSession",
});

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);
app.locals.moment = require("moment");
app.use(expressLayouts);
// app.use(logger("dev"));
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(
  session({
    secret: "secret",
    saveUninitialized: false,
    store: store,
    resave: false,

    cookie: {
      httpOnly: true,
      maxAge: sessionValues.session_time,
      sameSite: "strict",
    },
  })
);

app.use(
  i18n({
    translationsPath: path.join(__dirname, "i18n"),
    siteLangs: ["uz", "ru"],
    locales: ["uz"],
    textsVarName: "trans",
  })
);

// API
// Web Home page render
app.use("/", require("./router/web/index"));
// Web Home page render
app.use("/admin", require("./router/admin/index"));

// Projects api
app.use("/projects", require("./router/projects"));

// register Admin
app.use("/admincha", require("./router/user"));

// About
app.use("/about", require("./router/about"));

// Services
app.use("/services", require("./router/services"));

// Article
app.use("/article", require("./router/article"));

// News
app.use("/news", require("./router/news"));

// Team
app.use("/team", require("./router/team"));

// Contact
app.use("/contact", require("./router/contact"));

const port = 4004;
app.listen(port, () => {
  console.log(`Server is running in ${port}`);
});


// YecfTXfoia9JYv68
