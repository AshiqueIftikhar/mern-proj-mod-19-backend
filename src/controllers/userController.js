const userModel = require('../Models/userModel');
const JWT = require('jsonwebtoken')

//Register New User
exports.register = async (req, res)=>{
    try {
        let reqBody = req.body;
        let data = await userModel.create(reqBody);
        res.status(200).json({status:"success", data: data});
    } catch (error) {
        res.status(200).json({status:"error", error: error})
    }
}

//! User Login
exports.login = async (req, res) => {
    try {
      let reqBody = req.body;
  
      let data = await userModel.aggregate(
        [{ $match: reqBody }, { $project: { _id: 1, email: 1 } }])

        if (data.length > 0) {
            // let Payload = {
            //   exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            //   data: data[0]["email"],
            // };
            
            // let token = JWT.sign(Payload, `${process.env.JWT_AUTH_SECRET_KEY}`);
            
            let token = JWT.sign({email:reqBody.email}, process.env.JWT_AUTH_SECRET_KEY, {expiresIn:1000 * 60 * 60});
            res
              .status(200)
              .json({ status: "success", token: token, data: data[0] });
          } else {
            res.status(200).json({ status: "unauthorized", data: data });
          }
  
      } catch (e) {
      res.status(200).json({ status: "error", error: e });
    }
  };
