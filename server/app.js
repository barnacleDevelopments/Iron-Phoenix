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

//STATIC ASSETS
app.use("/", express.static(path.join(__dirname, "../public/admin/css")));
app.use("/", express.static(path.join(__dirname, "../public/admin")));

app.use("/", express.static(path.join(__dirname, "../public/customer/css")));
app.use("/", express.static(path.join(__dirname, "../public/customer")));

app.use("/", express.static(path.join(__dirname, "../public/js")));
app.use("/", express.static(path.join(__dirname, "../public/img")));
app.use("/", express.static(path.join(__dirname, "../public/img/icons")));
app.use("/", express.static(path.join(__dirname, "../public/fonts")));
app.use("/", express.static(path.join(__dirname, "../")));

//CONFIGURE ENVIROMENTAL VARIABLES
dotEnv.config();
const port = process.env.PORT;

//OBJECT TEMPLATES
const categories = [
  {
    productCategory: "cookies",
    productCount: 3,
    img:
      "https://images.unsplash.com/photo-1486428128344-5413e434ad35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
];

const products = [
  {
    id: "1",
    name: "chocolate chip",
    category: "cookies",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
    img:
      "https://images.unsplash.com/photo-1486428128344-5413e434ad35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    price: 6.33,
    toppings: [
      { title: "cherries", amount: 2 },
      { title: "nuts", amount: 1 },
      { title: "chocolate flakes", amount: 1 },
    ],
  },
  {
    id: "2",
    name: "peanut butter",
    category: "cookies",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
    img:
      "https://images.unsplash.com/photo-1519869491916-8ca6f615d6bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    price: 4.77,
    toppings: [
      { title: "cherries", amount: 1 },
      { title: "nuts", amount: 1 },
      { title: "chocolate flakes", amount: 1 },
    ],
  },
  {
    id: "3",
    name: "chocolate chip",
    category: "cookies",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
    img:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    price: 6.33,
    toppings: [
      { title: "cherries", amount: 1 },
      { title: "nuts", amount: 1 },
      { title: "chocolate flakes", amount: 1 },
    ],
  },
  {
    id: "4",
    name: "peanut butter",
    category: "cookies",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
    img:
      "https://images.unsplash.com/photo-1486428128344-5413e434ad35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    price: 4.77,
    toppings: [
      { title: "cherries", amount: 1 },
      { title: "nuts", amount: 1 },
      { title: "chocolate flakes", amount: 1 },
    ],
  },
  {
    id: "5",
    name: "peanut butter",
    category: "pies",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
    img:
      "https://images.unsplash.com/photo-1486428128344-5413e434ad35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    price: 4.77,
    toppings: [
      { title: "cherries", amount: 1 },
      { title: "nuts", amount: 1 },
      { title: "chocolate flakes", amount: 1 },
    ],
  },
  {
    id: "6",
    name: "peanut butter",
    category: "cookies",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
    img:
      "https://images.unsplash.com/photo-1486428128344-5413e434ad35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    price: 4.77,
    toppings: [
      { title: "cherries", amount: 1 },
      { title: "nuts", amount: 1 },
      { title: "chocolate flakes", amount: 1 },
    ],
  },
];

const user = {
  name: "user123",
  email: "user@gmail.com",
  address: "1027 lucknow st",
  number: "902-221-7158",
  allergies: ["peanuts", "milk", "eggs"],
  password: "**********",
};

const pendOrders = [
  {
    id: 1,
    date: "April 11, 2020",
    total: 301.8,
    location: "1027 Lucknow St.",
    products: [
      {
        name: "cake",
        price: 50.0,
      },
      {
        name: "cookie",
        price: 80.6,
      },
      {
        name: "muffin",
        price: 90.4,
      },
    ],
  },
  {
    id: 2,
    date: "April 11, 2020",
    total: 301.8,
    location: "1027 Lucknow St.",
    products: [
      {
        name: "crandberries",
        price: 50.0,
      },
      {
        name: "apple sauce",
        price: 80.6,
      },
      {
        name: "deasel",
        price: 90.4,
      },
    ],
  },
  {
    id: 3,
    date: "April 11, 2020",
    total: 301.8,
    location: "1027 Lucknow St.",
    products: [
      {
        name: "cake choc",
        price: 50.0,
      },
      {
        name: "chips",
        price: 80.6,
      },
      {
        name: "yummy",
        price: 90.4,
      },
    ],
  },
];

const customizationItems = [
  { title: "cherries", amount: 0 },
  { title: "nuts", amount: 0 },
  { title: "chocolate flakes", amount: 0 },
];

// CLIENT SIDE ROUTES
app.get("/", (req, res, next) => {
  res.redirect("/products");
});

app.get("/oops", (req, res, next) => {
  res.render("oops");
});

app.get("/products", (req, res, next) => {
  res.render("products", {
    categories,
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

app.get("/product/:category", (req, res, next) => {
  const category = req.params.category;
  let selectedProducts = [];

  products.forEach((product) => {
    if (product.category === category) selectedProducts.push(product);
  });
  res.render("category", {
    products: selectedProducts,
    customizationItems: customizationItems,
    category: category,
    header: category,
    pageType: false,
  });
});

app.get("/user/info/:id", (req, res, next) => {
  res.render("user", {
    userInfo: user,
    pageType: false,
    allergies: [
      "peanuts",
      "milk",
      "eggs",
      "tree nuts",
      "soy",
      "gluten",
      "fish",
      "shellfish",
    ],
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
  res.render("products-management");
});

app.get("/admin/allergies-management", (req, res, next) => {
  res.render("allergies-management");
});

app.get("/admin/addons-management", (req, res, next) => {
  res.render("addons-management");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
