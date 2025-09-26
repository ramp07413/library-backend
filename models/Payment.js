const mongoose = require('mongoose')


const paymentSchema = new mongoose.Schema({
  studentId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Student",
    required : true
  },
  amount : {
    type : Number
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
    enum : ['cash', 'online']
  }
},{
  timestamps : true
})

module.exports = mongoose.model('payment', paymentSchema)