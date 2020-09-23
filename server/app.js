// Declare variables
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotEnv from "dotenv";
import path from "path";
import expbs from "express-handlebars";

const app = express();
const db = "mongodb://localhost:27017/iron_phoenix";

// Connect to mongodb
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
app.get("/", (req, res, next) => {
  res.redirect("/products");
});

app.get("/login", (req, res, next) => {
  res.render("login");
});

app.get("/signup", (req, res, next) => {
  res.render("signup");
});

app.get("/oops", (req, res, next) => {
  res.render("oops");
});

app.get("/products", (req, res, next) => {
  res.render("products", {
    pageType: true,
    header: "categories",
  });
});

app.get("/about", (req, res, next) => {
  res.render("about", {
    pageType: false,
    header: "about",
  });
});

app.get("/terms", (req, res, next) => {
  res.render("terms", {
    pageType: false,
    header: "terms",
  });
});

app.get("/product/:category/:id", (req, res, next) => {
  const category = req.params.category;
  const id = req.params.id;
  res.render("category", {
    categoryId: id,
    header: category,
    pageType: false,
  });
});

app.get("/user/info/:id", (req, res, next) => {
  res.render("user", {
    pageType: false,
    header: "info",
  });
});

app.get("/user/cart/:id", (req, res, next) => {
  res.render("cart", { pageType: false, header: "cart" });
});

app.get("/user/order/:id", (req, res, next) => {
  res.render("order", {
    pageType: false,
    orders: {
      currentOrders: pendOrders,
      cancelledOrders: pendOrders,
      completedOrders: pendOrders,
    },
    header: "orders",
  });
});

//ADMIN SIDE ROUTES
app.get("/admin/products-management", (req, res, next) => {
  res.render("products-management", { layout: "admin.handlebars" });
});

app.get("/admin/allergies-management", (req, res, next) => {
  res.render("allergies-management", { layout: "admin.handlebars" });
});

app.get("/admin/addons-management", (req, res, next) => {
  res.render("addons-management", { layout: "admin.handlebars" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
