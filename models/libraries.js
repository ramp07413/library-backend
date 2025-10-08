import mongooes from 'mongoose'

const librarySchema = new mongooes.Schema({
    libraryName : {
        type : String,
        required : true
    },

    libraryEmail : {
        type : String,
        required : true
    }, 

    libraryContact : {
        type : String,
        required : true
    }, 

    libraryAddress : {
        type : Object,
        required : true
    }, 

    isActive : {
        type : Boolean, 
        default : false
    }

}, {timestamps : true})



export  const libraries = mongooes.model('libraries',librarySchema)