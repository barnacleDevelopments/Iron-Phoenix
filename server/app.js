import express from "express";
import dotEnv from "dotenv";
import path from "path";

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
        productImg: "https://images.unsplash.com/photo-1548365328-8c6db3220e4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    },
    {
        productCategory: "cuffins",
        productCount: 10,
        productImg: "https://images.unsplash.com/photo-1590759668557-48e829b5529e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
    },
    {
        productCategory: "pies",
        productCount: 90,
        productImg: "https://images.unsplash.com/photo-1587248721852-ffc60bffc129?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    }
]

const product = [
    {
        id: "32423432423",
        name: "chocolate chip",
        catagory: "cookies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        img: "https://images.unsplash.com/photo-1560910615-9eaa2e704e63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "peanut butter",
        catagory: "cookies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        img: "https://images.unsplash.com/photo-1584369372650-359b4003e743?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80"
    },
    {
        name: "apple crunch",
        catagory: "cookies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        img: "https://images.unsplash.com/photo-1557089706-68d02dbda277?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80"
    }

]

app.get("/", (req, res, next) => {
    res.render("index", {bakeryProducts: bakeryItemCatagories});
});

app.get("/cookies", (req, res, next) => {
    res.render("cookies_view", {cookies: product});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});