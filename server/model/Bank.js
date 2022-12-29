const mongoose=require('mongoose')
const bankSchema=new mongoose.Schema(
    {
    email:String,
    password:String,
    amount:{type:Number,default:0}
    },{timestamps:true}
)
const Bank=mongoose.model('Bank',bankSchema)

module.exports=Bank;