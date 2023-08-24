const JWT = require('jsonwebtoken');

module.exports = async (req, res, next)=>{
    try {
            let token = req.headers["token"];
            let dataToken  = await JWT.verify(token, process.env.JWT_AUTH_SECRET_KEY);
            let email = dataToken['email'];
            req.headers.email = email;
            next();
    } catch (error) {
        res.status(401).json({status:"unauthorized"})
    }
}