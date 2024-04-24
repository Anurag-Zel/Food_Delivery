//Dependancies
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import {addOrganisation, viewOrganisation, addItem, viewItem, addPricing, viewPricing, calculatePrice} from "./Controllers/index.js";

//Configure dotenv file
dotenv.config();

const app = express();
const port = process.env.PORT;

//Middlewares
app.use(bodyParser.json());

//Add new organisation
app.post("/add/organisation", addOrganisation)

//View all organisations
app.get("/view/organisation", viewOrganisation)

//Add new item
app.post("/add/item", addItem)

//View all items
app.get("/view/item", viewItem)

//Add new pricing
app.post("/add/pricing", addPricing)

//View pricing list
app.get("/view/pricing", viewPricing)

//Get results for frontend request
app.post("/calculate_pricing", calculatePrice)

app.listen(port, () => {
    console.log(`Server Running on port ${port}.`);
})