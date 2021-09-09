const jwt = require('jsonwebtoken') ;
const config = require('./config');


const getToken = (user) =>{

     var token = jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
        }, config.JWT_SECRET , {
        expiresIn: '48h'
        });
        
    console.log(token)
        return token

}

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decode)=>{
            if(err){
                res.status(401).send({msg: "Invalid token"})
            }
            req.user = token;
            next()
        })
    }
    res.status(401).send({msg: "user token is not supplied"})
}

const isAdmin = (req, res, next) =>{
    if(req.user && req.user.isAdmin){
        return next();
    } else{
        return res.status(401).send({msg: 'Admin token is not valid'})
    }
}


module.exports = {getToken, isAuth, isAdmin}