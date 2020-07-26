import express from "express";
import dotEnv from "dotenv";
import path from "path";
import expbs from "express-handlebars";

const app = express();

//handlebars config 
const hbs = expbs.create({
    defaultLayout: "main",
    layoutsDir:  path.join(__dirname, "../views/layouts"),
    partialsDir: path.join(__dirname, "../views/partials")
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars")

//STATIC ASSETS
app.use("/", express.static(path.join(__dirname, "../public/css")));
app.use("/", express.static(path.join(__dirname, "../public/js")));
app.use("/", express.static(path.join(__dirname, "../public/img")));
app.use("/", express.static(path.join(__dirname, "../public/fonts")));

//CONFIGURE ENVIROMENTAL VARIABLES
dotEnv.config();
const port = process.env.PORT;

//OBJECT TEMPLATES
const categories = [
    {
    productCategory: "cookies",
    productCount: 3,
    img: "https://images.unsplash.com/photo-1486428128344-5413e434ad35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }   
]

const products = [
    {
        id: "1",
        name: "chocolate chip",
        category: "cookies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        img: "https://images.unsplash.com/photo-1486428128344-5413e434ad35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 6.33,
        toppings: [{title: "cherries", amount: 2} , {title: "nuts", amount: 1}, {title: "chocolate flakes", amount: 1}]

    },
    {
        id: "2",
        name: "peanut butter",
        category: "cookies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        img: "https://images.unsplash.com/photo-1519869491916-8ca6f615d6bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 4.77,
        toppings: [{title: "cherries", amount: 1} , {title: "nuts", amount: 1}, {title: "chocolate flakes", amount: 1}]
    },
    {
        id: "3",
        name: "chocolate chip",
        category: "cookies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        img: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        price: 6.33,
        toppings: [{title: "cherries", amount: 1} , {title: "nuts", amount: 1}, {title: "chocolate flakes", amount: 1}]

    },
    {
        id: "4",
        name: "peanut butter",
        category: "cookies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        img: "https://images.unsplash.com/photo-1486428128344-5413e434ad35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 4.77,
        toppings: [{title: "cherries", amount: 1} , {title: "nuts", amount: 1}, {title: "chocolate flakes", amount: 1}]
    },
    {
        id: "5",
        name: "peanut butter",
        category: "pies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        img: "https://images.unsplash.com/photo-1486428128344-5413e434ad35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 4.77,
        toppings: [{title: "cherries", amount: 1} , {title: "nuts", amount: 1}, {title: "chocolate flakes", amount: 1}]
    },
    {
        id: "6",
        name: "peanut butter",
        category: "cookies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        img: "https://images.unsplash.com/photo-1486428128344-5413e434ad35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 4.77,
        toppings: [{title: "cherries", amount: 1} , {title: "nuts", amount: 1}, {title: "chocolate flakes", amount: 1}]
    }
];

const user = {
    name: "user123",
    email: "user@gmail.com",
    address: "1027 lucknow st",
    number: "902-221-7158",
    allergies: ["peanuts", "milk", "eggs"],
    password: "**********"
}

const pendOrders = [
    {
    date: "April 11, 2020",
    total: 301.80,
    location: "1027 Lucknow St.",
    products: [
        {
            name: "cake",
            price: 50.00
         
        }, 
        {
            name: "cookie",
            price: 80.60
        }, 
        {
            name: "muffin",
            price: 90.40
        }
    ]
    },
      {
    date: "April 11, 2020",
    total: 301.80,
    location: "1027 Lucknow St.",
    products: [
        {
            name: "crandberries",
            price: 50.00
         
        }, 
        {
            name: "apple sauce",
            price: 80.60
        }, 
        {
            name: "deasel",
            price: 90.40
        }
    ]
    },  
    {
        date: "April 11, 2020",
        total: 301.80,
        location: "1027 Lucknow St.",
        products: [
            {
                name: "cake choc",
                price: 50.00
             
            }, 
            {
                name: "chips",
                price: 80.60
            }, 
            {
                name: "yummy",
                price: 90.40
            }
        ]
        }

]

const customizationItems =  [{title: "cherries", amount: 0} , {title: "nuts", amount: 0}, {title: "chocolate flakes", amount: 0}]

// CLIENT SIDE ROUTES
app.get("/products", (req, res, next) => {
    res.render("categories_view", { categories, pageType: true, header: "categories"});
});

app.get("/about", (req, res, next) => {
    res.render("about_view", {products: bakeryItemCatagories, pageType: false, header: "about"});
});

app.get("/terms", (req, res, next) => {
    res.render("terms_view", {products: bakeryItemCatagories, pageType: false, header: "terms"});
});

app.get("/product/:category", (req, res, next) => {
    const category = req.params.category
    let selectedProducts = []
    products.forEach(product => {
        if(product.category === category)
        selectedProducts.push(product)
    })
    res.render("category_view", {products: selectedProducts, customizationItems: customizationItems, category: category, header: category, pageType: false});
});

app.get("/info/:user", (req, res, next) => {
    res.render("user_view", { userInfo: user, pageType: false,  allergies: ["peanuts", "milk", "eggs", "tree nuts", "soy", "gluten", "fish", "shellfish" ], header: "info" });
});

app.get("/cart/:user", (req, res, next) => {
    res.render("cart_view", { pageType: false, header: "cart" });
});

app.get("/order/:user", (req, res, next) => {
    res.render("order_view", { pageType: false, orders: {currentOrders: pendOrders, cancelledOrders: pendOrders, completedOrders: pendOrders }, header: "orders" });
});

//ADMIN SIDE ROUTES
app.get("/admin/products", (req, res, next) => {
    res.render("admin_products-management")
});

app.get("/admin/allergies", (req, res, next) => {
    res.render("admin_allergies-management")
});

app.get("/admin/addons", (req, res, next) => {
    res.render("admin_addons-management")
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});