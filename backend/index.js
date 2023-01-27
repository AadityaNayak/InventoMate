const express = require("express");
const cors = require("cors");

// Importing connection
require("./db/config");
// Importing schema for Users collection in db
const Users_model = require("./db/users");
// Importing schema for Users collection in db
const Products_model = require("./db/products");

const Jwt = require("jsonwebtoken");
const jwtKey = "e-commerce"

// Getting functionality of express
const app = express();

// Middleware to process req before recieving
app.use(express.json());
// Middleware to avoid cors error
app.use(cors());

// Just to render something at landing page
app.get("/", (req, res) => {
    res.send("<h1>This is Backend</h1>")
})

// signup API
app.post("/signup", async(req, res) => {
    let new_user = new Users_model(req.body);
    let result = await new_user.save();


    // To not to send password in response
    result = result.toObject();

    // To not send password as a result
    delete result.password
        // To make a Jwt token for the current user
    Jwt.sign({ result }, jwtKey, { expiresIn: "3h" }, (err, token) => {
        if (err) {
            res.send({ result: "Something went wrong" })
        } else {
            res.send({ result, auth: token })
        }
    })

})

// login API
app.post("/login", async(req, res) => {
    let result = await Users_model.findOne({ email: req.body.email, password: req.body.password })


    if (result == null) {
        // if both email and password together sent by login doesnt match any entry in collection 
        res.send(false);
    } else {

        // To make a Jwt token for the current user
        Jwt.sign({ result }, jwtKey, { expiresIn: "3h" }, (err, token) => {
            if (err) {
                res.send({ result: "Something went wrong" })
            } else {
                res.send({ result, auth: token })
            }
        })
    }
})

// Add Product API
app.post("/add-product", verifyToken, async(req, res) => {
    let new_product = new Products_model(req.body);
    let result = await new_product.save();

    result = result.toObject();
    res.send(result);
})

// Products list API
app.get("/products", verifyToken, async(req, res) => {
    let result = await Products_model.find();

    if (result.length > 0) {
        res.send(result)
    } else {
        res.send({ result: "No products found" });
    }
})

// Delete product API
app.delete("/products/:id", verifyToken, async(req, res) => {
    let result = await Products_model.deleteOne({ _id: req.params.id });
    res.send(result);
})

// API to get info of product by its id
app.get("/products/:id", verifyToken, async(req, res) => {
    let result = await Products_model.findOne({ _id: req.params.id });
    if (result) {
        res.send(result)
    } else {
        res.send({ result: "No result found" })
    }
})

// Update API
app.put("/products/:id", verifyToken, async(req, res) => {
    let result = await Products_model.updateOne({ _id: req.params.id }, {
        // $set is neccessary for updation
        $set: req.body
    })

    res.send(result)
})

//Search API
app.get("/search/:key", verifyToken, async(req, res) => {
    let result = await Products_model.find({
        // $or is used used to search in different fields
        $or: [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    })
    res.send(result);
})

function verifyToken(req, res, next) {

    // Getting token from headers
    let token = req.headers['authorization'];

    // Verifying token
    if (token) {

        // splitiing the token into list ["bearer", token]
        token = token.split(' ')[1]
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "Please provide valid token" });
            } else {
                next();
            }
        })

    } else {
        res.status(403).send({ result: "Please add token with header" });
    }
}
app.listen(5000);