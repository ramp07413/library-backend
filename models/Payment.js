const mongoose = require('mongoose')


const paymentSchema = new mongoose.Schema({
  StudentId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Student",
    required : true
  },
  dueDate : {
    type : Date
  },
  paidDate : {
    type : Date,
  },
  month : {
    type : String,
    required : true
  },
  year : {
    type : Number,
    required : true
  },
  status : {
    type : String,
    enum : ['pending', 'paid'],
    default : 'pending'
  },
  paymentType : {
    type : String,
    enum : ['cash', 'online'],
    required : true
  }
},{
  timestamps : true
})

module.exports = mongoose.model('payment', paymentSchema)