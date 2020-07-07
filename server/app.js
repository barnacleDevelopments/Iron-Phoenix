import express from "express";
import dotEnv from "dotenv";
import path from "path";

const app = express();

app.set("view engine", "ejs");

app.use("/", express.static(path.join(__dirname, "../public/css")));

console.log(path.join(__dirname, "../public"))

dotEnv.config();

const port = process.env.PORT;

const bakeryItemCatagories = [
    {
        productType: "Cookies",
        recipeCount: 30,
        productImg: "https://images.unsplash.com/photo-1548365328-8c6db3220e4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    },
    {
        productType: "Muffins",
        recipeCount: 10,
        productImg: "https://images.unsplash.com/photo-1590759668557-48e829b5529e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
    },
    {
        productType: "Pies",
        recipeCount: 90,
        productImg: "https://images.unsplash.com/photo-1587248721852-ffc60bffc129?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    }
]

app.get("/", (req, res, next) => {
    res.render("index", {bakeryProducts: bakeryItemCatagories});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});