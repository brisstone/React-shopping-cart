const express = require('express');
const User = require('../models/userModule');
const {getToken} = require('../util')

const router = express.Router();

router.post('/signin', async(req,res)=>{

    const signinuser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if(signinuser){
      
        
        res.json({
            // we arent sending the password cuz it is not secure
            _id: signinuser.id,
            name: signinuser.name,
            email: signinuser.email,
            isAdmin: signinuser.isAdmin,
            token: getToken(signinuser),

            //create a token and send the user to the token
           
            
        })
       
    } else{
        res.status(401).send({msg: 'invalid email or password'})
    }
})


router.post('/register', async(req,res)=>{
    try{
        const user = new User({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
        })
    
        const newUser = await user.save();
        if(newUser){
            res.send({
                // we arent sending the password cuz it is not secure
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: getToken(newUser),
    
            })
        }
    } catch(error){
        res.status(401).send({"error": error})
    }
    
  
})
router.get('/createadmin', async(req, res)=>{

    try{
            const user = new User({
            name: "john",
            email: 'briss@gmail.com',
            password: '1234',
            isAdmin: true
        })

        const newUser = await user.save();
        res.send(newUser);
    }catch(error){
        console.log(error)
        res.send({msg: error})
    }
    
})

module.exports = router