require("dotenv").config();
const mongoose = require("mongoose");
var http = require("http");

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const swaggerUI = require("swagger-ui-express");
const docs = require("./docs");
const cors = require("cors");

// var indexRouter = require('./routes/index');
var employeesRouter = require("./routes/employees");
var departmentsRouter = require("./routes/departments");
const employeesApiCtrl = require("./controllers/employeeApiCtrl");
const managerApiCtrl = require("./controllers/managerApiCtrl");

var app = express();
app.use(
  cors({
    origin: "*",
  })
);

var port = process.env.PORT || "3000";
app.set("port", port);

var server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
server.on("error", (error) => {
  console.log(error);
});
server.on("listening", () => {
  console.log("Listening for requests");
});

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
  res.redirect("/api-docs");
});

// app.use('/', indexRouter);
app.get("/employees/filter", employeesApiCtrl.filterEmp);
app.get("/employees/hierarchy/:guid", employeesApiCtrl.hierarchy);
app.get("/managers/:guid", managerApiCtrl.getMan);
app.use("/employees", employeesRouter);
app.use("/departments", departmentsRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));

mongoose.set("strictQuery", false);
mongoose.connect(process.env.mongoUri);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to ${process.env.mongoUri}`);
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

module.exports = app;
