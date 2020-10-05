// Declare variables
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotEnv from "dotenv";
import path from "path";
import expbs from "express-handlebars";
import passport from "passport";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import session from "express-session";
import bcrypt from "bcrypt";
require("../config/passport-setup");

const app = express();
const db = "mongodb://localhost:27017/iron_phoenix";
const saltRounds = 10;

// Connect to mongodb
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    key: "o0YCzRbrn84ajjyxfjJDsebIVF0g1dwLgIRv7U8",
    secret: "$2b$10$j5InjmG7hvUNp/RJHW8kTOx0ZaSlm",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Initialize routes
app.use("/api", require("./api/addon"));
app.use("/api", require("./api/allergy"));
app.use("/api", require("./api/category"));
app.use("/api", require("./api/product"));
app.use("/auth", require("./api/auth"));

// {{ Endpoint to serve the configuration file }}

app.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "auth_config.json"));
});

// Error Handle
app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.name + ": " + err.message });
});

//handlebars config
const hbs = expbs.create({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "../views/layouts"),
  partialsDir: path.join(__dirname, "../views/partials"),
  extName: ".handlebars",
  helpers: {
    biggerThen: (element, value1, value2, options) => {
      if (value1 > value2) {
        return `<h3 style="font-weight: 600 !important;
        text-transform: capitalize;
        padding-left: 20px;
        width: 100% !important;
        overflow-wrap: normal;">${options.fn({ value: element })}</h3>`;
      } else {
        return `<h2 style="  font-weight: 600 !important;
        text-transform: capitalize;
        padding-left: 20px;
        width: 100% !important;
        overflow-wrap: normal;">${options.fn({ value: element })}</h2>`;
      }
    },
    elipsis: (string, length) => {
      if (string.length >= length) {
        return `${string.slice(0, length)}...`;
      }
    },
  },
});

app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);
app.set("views", path.join(__dirname, "../views"));

bcrypt.hash("iron-phoenix", saltRounds, function (err, hash) {});

// User Session

/*
==============================
STATIC ASSETS
=============================
*/

// EVERYTHING
app.use("/", express.static(path.join(__dirname, "../")));

// ADMIN FOLDER
app.use("/", express.static(path.join(__dirname, "../public/admin")));

// CUSTOMER FOLDER
app.use("/", express.static(path.join(__dirname, "../public/customer")));

// CSS
app.use("/", express.static(path.join(__dirname, "../public/admin/css")));
app.use("/", express.static(path.join(__dirname, "../public/customer/css")));

// JAVASCRIPT
app.use("/", express.static(path.join(__dirname, "../public/js")));

// FONTS & IMAGES
app.use("/", express.static(path.join(__dirname, "../public/img")));
app.use("/", express.static(path.join(__dirname, "../public/img/icons")));
app.use("/", express.static(path.join(__dirname, "../public/fonts")));

//CONFIGURE ENVIROMENTAL VARIABLES
dotEnv.config();
const port = process.env.PORT;

// CLIENT SIDE ROUTES

// a post route to sign user up
app.post("/signup", function (req, res, next) {
  passport.authenticate("local-signup", function (err, user, info) {
    console.log("info", info);
    if (err) {
      console.log("passport err", err);
      return next(err); // will generate a 500 error
    }

    if (!user) {
      return res.send({ success: false, message: "Email already exist!" });
    }

    req.login(user, function (err) {
      if (err) {
        console.log("loginerr", err);
        return next(err);
      }
      console.log("redirecting....");
      res.cookie("first_name", user.firstName);
      res.cookie("id", user._id);
      return res.send({ success: true, message: "" });
    });
  })(req, res, next);
});

// a post route to log user in
app.post("/login", function (req, res, next) {
  passport.authenticate("local-login", function (err, user, info) {
    if (err) {
      console.log("passport err", err);
      return next(err); // will generate a 500 error
    }
    if (!user) {
      return res.send({ success: false, message: "authentication failed" });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        console.log("loginerr", loginErr);
        return next(loginErr);
      }

      console.log("redirecting....");
      res.cookie("first_name", user.firstName);
      res.cookie("id", user._id);
      return res.send({ success: true, message: "" });
    });
  })(req, res, next);
});

// a get route to redirect user to products
app.get("/", (req, res, next) => {
  res.redirect("/products");
});

// a get route to redirect user to products || signup
app.get("/signup", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/products");
  } else {
    res.render("signup");
  }
});

// a get route to redirect user to products || login
app.get("/login", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/products");
  } else {
    res.render("login");
  }
});

// a get route to redirect user out of the app
app.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    req.logout();
    res.clearCookie("first_name");
    res.clearCookie("id");
    res.redirect("/login");
  });
});

// a get route to redirect user to oops
app.get("/oops", (req, res, next) => {
  res.render("oops");
});

// a get route to redirect user to products || login
app.get("/products", (req, res, next) => {
  if (req.isAuthenticated()) {
    var user = {
      id: req.session.passport.user,
      isloggedin: req.isAuthenticated(),
    };

    res.render("products", {
      pageType: true,
      header: "categories",
      user,
    });
  } else {
    res.redirect("/login");
  }
});

// a get route to redirect user to about || login
app.get("/about", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("about", {
      pageType: false,
      header: "about",
    });
  } else {
    res.redirect("/login");
  }
});

// a get route to redirect user to terms || login
app.get("/terms", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("terms", {
      pageType: false,
      header: "terms",
    });
  } else {
    res.redirect("/login");
  }
});

// a get route to redirect user to category || login
app.get("/product/:category/:id", (req, res, next) => {
  const category = req.params.category;
  const id = req.params.id;

  if (req.isAuthenticated()) {
    res.render("category", {
      categoryId: id,
      header: category,
      pageType: false,
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/user/info", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("user", {
      pageType: false,
      header: "info",
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/user/cart/:id", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("cart", { pageType: false, header: "cart" });
  } else {
    res.redirect("/login");
  }
});

app.get("/user/order/:id", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("order", {
      pageType: false,
      orders: {
        currentOrders: pendOrders,
        cancelledOrders: pendOrders,
        completedOrders: pendOrders,
      },
      header: "orders",
    });
  } else {
    res.redirect("/login");
  }
});

//ADMIN SIDE ROUTES
app.get("/admin/products-management", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("products-management", { layout: "admin.handlebars" });
  } else {
    res.redirect("/login");
  }
});

app.get("/admin/allergies-management", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("allergies-management", { layout: "admin.handlebars" });
  } else {
    res.redirect("/login");
  }
});

app.get("/admin/addons-management", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("addons-management", { layout: "admin.handlebars" });
  } else {
    res.redirect("/login");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
