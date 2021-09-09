var express = require('express');
var data = require('./data');
var config = require('./config')
var dotenv = require('dotenv')
var mongoose = require('mongoose')
var userRouter = require('./route/userRoute');
var bodyPaser = require('body-parser');
var productRoute = require('./route/productRoute')

dotenv.config();

var app = express();
app.use(bodyPaser.json());



const mongodbUrl = config.MONGODB_URL || process.env.MONGODB_URL

mongoose.connect(mongodbUrl, 
    {useUnifiedTopology: true, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true
    }).catch(error => console.log(error));
        
    
app.use('/api/users', userRouter);
app.use('/api/products', productRoute)



// app.get('/api/products/:id', async (req,res)=>{
//    const productId = req.params.id;
//    console.log(productId )
//    const product = await data.find(x=> x._id === productId);
  
//     try{
//         console.log(product)
//         res.send(product)
//     } catch(error){
//         res.status(404).send({msg: "Page not found"})
//     }
   

// })

// app.get('/api/products', (req,res)=>{
//     console.log(data)
//     res.send(data);

// })

const port = 5000;
app.listen(port, ()=>{
    console.log(` server started at port ${port} ` )
})
