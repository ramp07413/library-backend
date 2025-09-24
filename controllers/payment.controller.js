const Payment = require("../models/Payment");

const getPayments = async(req, res, next)=>{
    try {
        const payments = await Payment.find({})
        if(!payments || payments.length === 0){
            return res.status(400).json({
                message : "payment not found !"
            })
        }

        res.status(200).json({
            success : true,
            payments
        })
    } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message });
    }
}

const addPendingPayment = async(req, res, next)=>{
    try {

        const paymentData = await Payment.find({})
        
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getPayments
}