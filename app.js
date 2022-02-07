var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const utils = require("./lib/utils");
const session = require("express-session");
const sessionAuth = require("./lib/sessionMiddleware");
const Logincontroller = require("./controllers/loginController");
const jwtAuth = require("./lib/jwtAuthMiddleware");
const MongoStore = require("connect-mongo");
const ImageController = require("./controllers/imageController");
const AdController = require("./controllers/adController");
const AdGetController = require("./controllers/adGetController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./microservicio/public/images",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  dest: "./microservicio/public/images",
});

var app = express();

//conectamos a la base de datos
require("./lib/connectMongoose");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "microservicio/public/images")));
app.use(express.static(path.join(__dirname, "public")));
const loginController = new Logincontroller();
const imageController = new ImageController();
const adgetController = new AdGetController();
const adController = new AdController();
// setup de i18n

const i18n = require("./lib/i18nConfigure");

app.use(i18n.init);

// Setup de sesiones del Website
app.use(
  session({
    name: "nodeapi-session",
    secret: "{m3}E^~%r5zy{p;dG:]S,BZ*",
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2, // dos dias de inactividad
    },
    store: MongoStore.create({
      mongoUrl: 'MongoDB://localhost:27017',
    }),
  }),
);

// hacemos disponible la session en todas las vistas

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
//Prueba rapida
i18n.setLocale("es");
console.log(i18n.__("Welcome to NodeApi"));

/**
 * Rutas de mi API
 */
app.post("/apiv1/anuncios", upload.single("foto"), adController.post);
app.get("/apiv1/anuncios", jwtAuth, adgetController.get);
app.use("/apiv1/tags", jwtAuth, require("./routes/apiv1/tags"));
app.post("/apiv1/authenticate", loginController.postJWT);
app.get("/api/image/:", jwtAuth, imageController.index);
/**
 * Rutas de mi website
 */
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/change-locale", require("./routes/change-locale"));
app.use("/features", require("./routes/features"));
app.use("/privado", sessionAuth, require("./routes/privado"));
//Usamos el concepto de controlladores
app.get("/login", loginController.index);
app.post("/login", loginController.post);
app.get("/logout", loginController.logout);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  if (utils.isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page

  res.render("error");
});

module.exports = app;
