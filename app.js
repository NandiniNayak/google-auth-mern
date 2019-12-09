const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");


require("./database/models/User");
require("./config/passport")(passport);

//// Loading routes ////
const auth = require("./routes/auth");
const blog = require("./routes/listing");

//// Loading mongoose keys ////
const keys = require("./config/keys");

mongoose.Promise = global.Promise;
// mongoose connect
mongoose
  .connect(
    keys.mongoURI,
    {
      useNewUrlParser: true
    }
  ) 
  .then(() => console.log("MongoDb connection"))
  .catch(err => console.log(err));

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

//// passport initialize  ////
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.get("/", (req, res) => {
  res.send("HOME");
});

app.use("/auth", auth);
app.use("/api/blogs", blog);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
var port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`started server on port ${port}`);
});
