const { default: mongoose } = require('mongoose');
const cartModel = require('../Models/cartModel');

// Create Cart
exports.createCart = async (req, res)=>{
    try {
        let reqBody = req.body;
        let data = await cartModel.create(reqBody);
        res.status(200).json({status:"success", data: data})
    } catch (error) {
        res.status(500).json({status:"error", error: error})
    }
};

// Get All Cart List
exports.getAllCartList = async (req, res)=>{
    let email = req.body.user_email;
    try {
        let data = await cartModel.aggregate([
            { $match:{user_email:email} },
            {
                $lookup:{
                    from: "products",
                    localField: "product_id",
                    foreignField: "_id",
                    as: "cartList"  
                }
            },
            {
                $project:{
                    _id:1,
                    user_email:1,
                    product_id:1,
                    cartList:1
                }
            },
            {
                $unwind:"$cartList"
            }
        ]);
        res.status(200).json({status:"success", data: data})
    } catch (error) {
        
    }
}

// Delete Cart product

    exports.deleteCart = async (req, res)=>{
        try {
            let id = req.params.id;
            let query = {_id:id};
            let data = await cartModel.deleteOne(query);
            res.status(200).json({status:"success", data: data})
        } catch (error) {
            res.status(500).json({status:"error", error: error})
        }
}