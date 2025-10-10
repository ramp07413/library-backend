import { validationResult } from "express-validator";
import { libraries } from "../../models/libraries.js"

export const registerLibrary = async(req, res, next)=>{
    try {

        const {libraryName, libraryEmail, libraryContact, address_line1,address_line2,city,state,pincode,subscription_plan,subscription_status} = req.body || {}

         const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return next({ status: 400, errors: errors.array() });
        }

        let librarydata = await libraries.findOne({libraryEmail})

        if(librarydata){
            return res.status(400).json({
                success : false,
                message : "library already registered !"
            })
        }

        librarydata = await libraries.create({
            libraryName, libraryEmail, libraryContact, address_line1,address_line2,city,state,pincode,subscription_plan,subscription_status
        })

         res.status(200).json({
                success : true,
                message : "library register successfully !",
                librarydata
            })
        
    } catch (err) {
        console.error(err)
        res.status(500).josn({
            success : false,
            message : err.message
        })
    }
}


export const updateLibrary = async(req, res, next)=>{
    try {

        const libraryId  = req.params.id

        const {libraryName, libraryEmail, libraryContact, address_line1,address_line2,city,state,pincode,subscription_plan,subscription_status} = req.body || {}
        
        if (!errors.isEmpty()) {
            return next({ status: 400, errors: errors.array() });
        }

        let librarydata = await libraries.findOne({libraryEmail})

        if(librarydata){
            return res.status(400).json({
                success : false,
                message : "library already registered !"
            })
        }

        librarydata = await libraries.create({
            libraryName, libraryEmail, libraryContact, address_line1,address_line2,city,state,pincode,subscription_plan,subscription_status
        })

         res.status(200).json({
                success : true,
                message : "library register successfully !",
                librarydata
            })
        
    } catch (err) {
        console.error(err)
        res.status(500).josn({
            success : false,
            message : err.message
        })
    }
}




export const getLibrares = async(req, res, next)=>{
    try {

        let librarydata = await libraries.find({})

         res.status(200).json({
                success : true,
                librarydata
            })
        
    } catch (err) {
        console.error(err)
        res.status(500).josn({
            success : false,
            message : err.message
        })
    }
}


