const express = require("express");
const app = express();
const port = 4000;
const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 699 },
    { id: 3, name: 'Tablet', price: 499 }
];
app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello user");
})

app.get("/user", (req, res) => {
    res.send("user details");
})

app.get("/products", (req, res) => {
    res.json({
        success: true,
        products
    })
})



app.post("/product", (req, res) => {
    const body = req.body
    const { name, price } = body
    console.log(name, price)
    const productId = products.length + 1
    const product = { id: productId, name, price }
    products.push(product)
    res.json({
        success: true,
        productId

    })
})

app.get("/product/:id", (req, res) => {
    // get the id
    const id = req.params.id;
    // find the product through id
    const prod = products.find((product) => {
        return product.id == id
    })
    // return the product
    res.json({
        success: true,
        product: prod
    })
})

app.put("/product/:id", (req, res) => {
    const id = parseInt(req.params.id); // Convert string to number
    const { name, price } = req.body;
    
    // Find the index of the product to update
    const productIndex = products.findIndex(product => product.id === id);
    
    if (productIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }
    
    // Update the product
    const updatedProduct = {
        ...products[productIndex],
        name: name || products[productIndex].name, // Keep existing if not provided
        price: price || products[productIndex].price
    };
    
    // Update the array (if you want to persist changes)
    products[productIndex] = updatedProduct;
    
    res.json({
        success: true,
        product: updatedProduct
    });
});

app.delete("/product/:id", (req, res) => {
    const id = parseInt(req.params.id);
    
    // Find index of product to delete
    const productIndex = products.findIndex(product => product.id === id);
    
    if (productIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }
    
    // Remove the product from the array
    const deletedProduct = products.splice(productIndex, 1)[0];
    
    res.json({
        success: true,
        message: "Product deleted successfully",
        deletedProduct: deletedProduct
    });
});

app.get("/posts", async (req, res) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await response.json()
    res.json({
        success: true,
        posts: data,
    })
})

app.get("/post/:id", async (req, res) => {
    const id = req.params.id;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const data = await response.json()
    res.json({
        success: true,
        post: data,
    })
})

app.listen(port, () => {
    console.log(`Server is Running on http://localhost:${port}`);
})