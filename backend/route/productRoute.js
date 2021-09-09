const express = require('express');
const Product = require('../models/productModule');
const {isAuth, isAdmin} = require('../util')

const router = express.Router();

router.get('/', async (req, res)=>{
    const products = await Product.find({});
    res.send(products);
});

router.post("/", isAuth, isAdmin, async (req, res)=>{
    const product = new Product({
        name :  req.body.name,
        price : req.body.price,
        image :  req.body.image,
        brand :  req.body.brand,
        category :  req.body.category,
        countInStock :  req.body.countInStock,
        description :  req.body.description,
        rating : req.body.rating,
        numReviews :  req.body.numReviews
    })
    try{
        const newProduct = await product.save();
        if(newProduct){
            res.status(201).send({msg: "new product created", data : newProduct})
        } 
    } catch(err){
        return res.status(500).send(err)
    }
    
})


router.put("/:id", isAuth, isAdmin, async (req, res)=>{
    try{
        const productId = req.params.id;

    const product = await Product.findOne({_id : productId})
    
        if(product){
            product.name =  req.body.name,
            product.price = req.body.price,
            product.image =  req.body.image,
            product.brand =  req.body.brand,
            product.category =  req.body.category,
            product.countInStock =  req.body.countInStock,
            product.description =  req.body.description,
            product.numReviews =  req.body.numReviews

            const updatedProduct = await product.save();
            if(updatedProduct){
                res.status(200).send({message: "product updated", data : updatedProduct})
            }else{
                return res.status(500).send({message: "error in updating product"})
            }
        }
    } catch(err){
        res.send(err)
    }
    
         
})


router.delete("/:id", isAuth, isAdmin, async(req, res)=>{
    try{
            productId = req.params.id;
        var deleteProduct = await Product.deleteOne({_id : productId});
        console.log(deleteProduct)
        res.send({message: 'product deleted'})
       
    }catch(err){
        res.send(err)
    }
   
})

module.exports = router