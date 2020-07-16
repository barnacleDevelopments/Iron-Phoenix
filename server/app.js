import express from "express";
import dotEnv from "dotenv";
import path from "path";
import { initializeFirebase } from "./push-notification"

initializeFirebase();

const app = express();

app.set("view engine", "ejs");

app.use("/", express.static(path.join(__dirname, "../public/css")));
app.use("/", express.static(path.join(__dirname, "../public/js")));
app.use("/", express.static(path.join(__dirname, "../public/img")));
app.use("/", express.static(path.join(__dirname, "../public/fonts")));

console.log(path.join(__dirname, "../public"))

dotEnv.config();

const port = process.env.PORT;

const bakeryItemCatagories = [
    {
        productCategory: "cookies",
        productCount: 30,
        img: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
    },
    {
        productCategory: "muffins",
        productCount: 10,
        img: "https://images.unsplash.com/photo-1519869491916-8ca6f615d6bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
        productCategory: "pies",
        productCount: 90,
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
        price: 6.33

    },
    {
        id: "2",
        name: "peanut butter",
        category: "cookies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        img: "https://images.unsplash.com/photo-1519869491916-8ca6f615d6bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 4.77
    },
    {
        id: "3",
        name: "chocolate chip",
        category: "cookies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        img: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        price: 6.33

    },
    {
        id: "4",
        name: "peanut butter",
        category: "cookies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        img: "https://images.unsplash.com/photo-1486428128344-5413e434ad35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 4.77
    },
    {
        id: "5",
        name: "peanut butter",
        category: "pies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        img: "https://images.unsplash.com/photo-1486428128344-5413e434ad35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 4.77
    },
    {
        id: "6",
        name: "peanut butter",
        category: "cookies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        img: "https://images.unsplash.com/photo-1486428128344-5413e434ad35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 4.77
    }
];


const user = {
    email: "user@gmail.com",
    name: "user123",
    number: "902-221-7158",
    password: "**********" 
}

app.get("/products", (req, res, next) => {
    res.render("categories_view", {products: bakeryItemCatagories, pageType: "standard"});
});

app.get("/about", (req, res, next) => {
    res.render("about_view", {products: bakeryItemCatagories, pageType: "", header: "about"});
});

app.get("/terms", (req, res, next) => {
    res.render("terms_view", {products: bakeryItemCatagories, pageType: "", header: "terms"});
});

app.get("/product/:category", (req, res, next) => {
    const category = req.params.category
    let selectedProducts = []
    products.forEach(product => {
        if(product.category === category)
        selectedProducts.push(product)
    })
    res.render("category_view", {products: selectedProducts, category: category, header: category, pageType: ""});
});

app.get("/product/:category/:id", (req, res, next) => {
    const itemId   = req.params.id
    const category = req.params.category
    let selectedItem
    products.forEach(item => {
        if(item.id === itemId) {
            selectedItem = item
        }
    });
    res.render("item_view", {item: selectedItem, category: category, pageType: "item_view"});
})


app.get("/info/:user", (req, res, next) => {
    res.render("user_view", { pageType: "", header: "info" });
});

app.get("/cart/:user", (req, res, next) => {
    res.render("cart_view", { pageType: "", header: "cart" });
});

app.get("/order/:user", (req, res, next) => {
    res.render("order_view", { pageType: "", header: "orders" });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});