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
        productCategory: "cuffins",
        productCount: 10,
        productImg: "/cake_1.jpg"
    },
    {
        productCategory: "pies",
        productCount: 90,
        productImg: "/cake_1.jpg"
    }
]

const products = [
    {
        id: "32423432423",
        name: "chocolate chip",
        catagory: "cookies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        img: "/cake_1.jpg"
    },
    {
        name: "peanut butter",
        catagory: "cookies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        img: "/cake_1.jpg"
    },
    {
        name: "apple crunch",
        catagory: "cookies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        img: "/cake_1.jpg"
    }

]

const singleProduct =    {
    id: "32423432423",
    name: "chocolate chip",
    category: "cookies",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
    img: "/cake_2.jpg",
    price: 2.22
}

app.get("/", (req, res, next) => {
    res.render("index", {products: bakeryItemCatagories, backActive: false});
});

app.get("/:category", (req, res, next) => {
    res.render("category_view", {products: products, backActive: true});
});

app.get("/:catagory/:item", (req, res, next) => {
    res.render("item_view", {item: singleProduct, backActive: true})
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});