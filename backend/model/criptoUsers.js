const mongoose = require('mongoose');

const cryptoAdminSchema = new mongoose.Schema({
    name: {type:String},
    email:  {type:String},
    country:  {type:String},
    gender:  {type:String},
    password:  {type:String},
    Address:  {type:String},
    mobile:  {type:Number},
    state:  {type:String},
    modifiedon:  {type:String},
    privacy:{type:Boolean},
    age:  {type:Number},
    targetInvestment:  {type:Number},

},
{
    collection:'cryptoUsers',
});
 module.exports=mongoose.model('cryptoAdminSchema',cryptoAdminSchema);