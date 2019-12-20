const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json())
const products = [
    {id:1,name:'Dell'},
    {id:2,name:'Lenovo'},
    {id:3,name:'HP'}
];


// testing 
app.get('/',(req,res)=>{
    res.send('Hello');
})

// get all the products
app.get('/api/products',(req,res)=>{
    res.send(products);
})

// get product by id
app.get('/api/products/:id',(req,res)=>{
    const product = products.find(res=>res.id===parseInt(req.params.id));
    if(!product) res.status(404).send('The product is not available');
    res.send(product)
})

// post request

app.post('/api/products',(req,res)=>{
    const product = {
        id: products.length+1,
        name : req.body.name
    };
    products.push(product);
    res.send(product);
})

// put request
app.put('/api/products/:id',(req,res)=>{
    const product = products.find(res=>res.id===parseInt(req.params.id));
    if(!product) res.status(404).send('The product is not available');

    product.name = req.body.name;
    // updated product
    res.send(product);
})

app.delete('/api/products/:id',(req,res)=>{
    const product = products.find(res=>res.id===parseInt(req.params.id));
    if(!product) res.status(404).send('The product is not available');

    // delete

    const index = products.indexOf(product);
    products.splice(index,1);

    res.send(products);
})


app.listen(port,()=>{
    console.log('server is up and running on port 3000');
})