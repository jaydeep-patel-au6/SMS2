var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
 
var studentSchema = new Schema({
  _id: ObjectId,
  name: {type:String},
  email: {type:String},
  password: {type:String}
});


var Student = mongoose.model('Student',studentSchema);
module.exports=Student