"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _handlebarsHelpers = _interopRequireDefault(require("handlebars-helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); //handlebars config

var hbs = _expressHandlebars["default"].create({
  defaultLayout: "main",
  layoutsDir: _path["default"].join(__dirname, "../views/layouts"),
  partialsDir: _path["default"].join(__dirname, "../views/partials"),
  extName: ".handlebars",
  helpers: {
    biggerThen: function biggerThen(element, value1, value2, options) {
      if (value1 > value2) {
        return "<h3 style=\"font-weight: 600 !important;\n        text-transform: capitalize;\n        padding-left: 20px;\n        width: 100% !important;\n        overflow-wrap: normal;\">".concat(options.fn({
          value: element
        }), "</h3>");
      } else {
        return "<h2 style=\"  font-weight: 600 !important;\n        text-transform: capitalize;\n        padding-left: 20px;\n        width: 100% !important;\n        overflow-wrap: normal;\">".concat(options.fn({
          value: element
        }), "</h2>");
      }
    },
    elipsis: function elipsis(string, length) {
      if (string.length >= length) {
        return "".concat(string.slice(0, length), "...");
      }
    }
  }
});

app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);
app.set("views", _path["default"].join(__dirname, "../views")); //STATIC ASSETS

app.use("/", _express["default"]["static"](_path["default"].join(__dirname, "../public/css")));
app.use("/", _express["default"]["static"](_path["default"].join(__dirname, "../public/js")));
app.use("/", _express["default"]["static"](_path["default"].join(__dirname, "../public/img")));
app.use("/", _express["default"]["static"](_path["default"].join(__dirname, "../public/img/icons")));
app.use("/", _express["default"]["static"](_path["default"].join(__dirname, "../public/fonts")));
app.use("/", _express["default"]["static"](_path["default"].join(__dirname, "../"))); //CONFIGURE ENVIROMENTAL VARIABLES

_dotenv["default"].config();

var port = process.env.PORT; //OBJECT TEMPLATES

var categories = [{
  productCategory: "cookies",
  productCount: 3,
  img: "https://images.unsplash.com/photo-1486428128344-5413e434ad35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
}];
var products = [{
  id: "1",
  name: "chocolate chip",
  category: "cookies",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
  img: "https://images.unsplash.com/photo-1486428128344-5413e434ad35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  price: 6.33,
  toppings: [{
    title: "cherries",
    amount: 2
  }, {
    title: "nuts",
    amount: 1
  }, {
    title: "chocolate flakes",
    amount: 1
  }]
}, {
  id: "2",
  name: "peanut butter",
  category: "cookies",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
  img: "https://images.unsplash.com/photo-1519869491916-8ca6f615d6bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  price: 4.77,
  toppings: [{
    title: "cherries",
    amount: 1
  }, {
    title: "nuts",
    amount: 1
  }, {
    title: "chocolate flakes",
    amount: 1
  }]
}, {
  id: "3",
  name: "chocolate chip",
  category: "cookies",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
  img: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  price: 6.33,
  toppings: [{
    title: "cherries",
    amount: 1
  }, {
    title: "nuts",
    amount: 1
  }, {
    title: "chocolate flakes",
    amount: 1
  }]
}, {
  id: "4",
  name: "peanut butter",
  category: "cookies",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
  img: "https://images.unsplash.com/photo-1486428128344-5413e434ad35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  price: 4.77,
  toppings: [{
    title: "cherries",
    amount: 1
  }, {
    title: "nuts",
    amount: 1
  }, {
    title: "chocolate flakes",
    amount: 1
  }]
}, {
  id: "5",
  name: "peanut butter",
  category: "pies",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
  img: "https://images.unsplash.com/photo-1486428128344-5413e434ad35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  price: 4.77,
  toppings: [{
    title: "cherries",
    amount: 1
  }, {
    title: "nuts",
    amount: 1
  }, {
    title: "chocolate flakes",
    amount: 1
  }]
}, {
  id: "6",
  name: "peanut butter",
  category: "cookies",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
  img: "https://images.unsplash.com/photo-1486428128344-5413e434ad35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  price: 4.77,
  toppings: [{
    title: "cherries",
    amount: 1
  }, {
    title: "nuts",
    amount: 1
  }, {
    title: "chocolate flakes",
    amount: 1
  }]
}];
var user = {
  name: "user123",
  email: "user@gmail.com",
  address: "1027 lucknow st",
  number: "902-221-7158",
  allergies: ["peanuts", "milk", "eggs"],
  password: "**********"
};
var pendOrders = [{
  id: 1,
  date: "April 11, 2020",
  total: 301.8,
  location: "1027 Lucknow St.",
  products: [{
    name: "cake",
    price: 50.0
  }, {
    name: "cookie",
    price: 80.6
  }, {
    name: "muffin",
    price: 90.4
  }]
}, {
  id: 2,
  date: "April 11, 2020",
  total: 301.8,
  location: "1027 Lucknow St.",
  products: [{
    name: "crandberries",
    price: 50.0
  }, {
    name: "apple sauce",
    price: 80.6
  }, {
    name: "deasel",
    price: 90.4
  }]
}, {
  id: 3,
  date: "April 11, 2020",
  total: 301.8,
  location: "1027 Lucknow St.",
  products: [{
    name: "cake choc",
    price: 50.0
  }, {
    name: "chips",
    price: 80.6
  }, {
    name: "yummy",
    price: 90.4
  }]
}];
var customizationItems = [{
  title: "cherries",
  amount: 0
}, {
  title: "nuts",
  amount: 0
}, {
  title: "chocolate flakes",
  amount: 0
}]; // CLIENT SIDE ROUTES

app.get("/", function (req, res, next) {
  res.redirect("/products");
});
app.get("/oops", function (req, res, next) {
  res.render("oops");
});
app.get("/products", function (req, res, next) {
  res.render("products", {
    categories: categories,
    pageType: true,
    header: "categories"
  });
});
app.get("/about", function (req, res, next) {
  res.render("about", {
    pageType: false,
    header: "about"
  });
});
app.get("/terms", function (req, res, next) {
  res.render("terms", {
    pageType: false,
    header: "terms"
  });
});
app.get("/product/:category", function (req, res, next) {
  var category = req.params.category;
  var selectedProducts = [];
  products.forEach(function (product) {
    if (product.category === category) selectedProducts.push(product);
  });
  res.render("category", {
    products: selectedProducts,
    customizationItems: customizationItems,
    category: category,
    header: category,
    pageType: false
  });
});
app.get("/user/info/:id", function (req, res, next) {
  res.render("user", {
    userInfo: user,
    pageType: false,
    allergies: ["peanuts", "milk", "eggs", "tree nuts", "soy", "gluten", "fish", "shellfish"],
    header: "info"
  });
});
app.get("/user/cart/:id", function (req, res, next) {
  res.render("cart", {
    pageType: false,
    header: "cart"
  });
});
app.get("/user/order/:id", function (req, res, next) {
  res.render("order", {
    pageType: false,
    orders: {
      currentOrders: pendOrders,
      cancelledOrders: pendOrders,
      completedOrders: pendOrders
    },
    header: "orders"
  });
}); //ADMIN SIDE ROUTES

app.get("/admin/products-management", function (req, res, next) {
  res.render("products-management");
});
app.get("/admin/allergies-management", function (req, res, next) {
  res.render("allergies-management");
});
app.get("/admin/addons-management", function (req, res, next) {
  res.render("addons-management");
});
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});