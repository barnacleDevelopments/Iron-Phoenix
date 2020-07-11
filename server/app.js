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

console.log(path.join(__dirname, "../public"))

dotEnv.config();

const port = process.env.PORT;

const bakeryItemCatagories = [
    {
        productCategory: "cookies",
        productCount: 30,
        productImg: "/cake_1.jpg"
    },
    {
        productCategory: "muffins",
        productCount: 10,
        productImg: "/cake_4.jpg"
    },
    {
        productCategory: "pies",
        productCount: 90,
        productImg: "/cake_7.jpg"
    }
]

const products = [
    {
        id: "1",
        name: "chocolate chip",
        category: "cookies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        img: "/cake_1.jpg",
        price: 6.33

    },
    {
        id: "2",
        name: "peanut butter",
        category: "cookies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        img: "/cake_2.jpg",
        price: 4.77
    },

    {
        id: "3",
        name: "apple crunch",
        category: "muffins",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        img: "/cake_3.jpg",
        price: 3.44
    }
]


app.get("/", (req, res, next) => {
    res.render("categories_view", {products: bakeryItemCatagories, pageType: "categories_view"});
});

app.get("/:category", (req, res, next) => {
    const category = req.params.category
    let selectedProducts = []
    products.forEach(product => {
        if(product.category === category)
        selectedProducts.push(product)
    })
    res.render("category_view", {products: selectedProducts, category: category, pageType: "category_view"});
});

app.get("/:category/:id", (req, res, next) => {
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});