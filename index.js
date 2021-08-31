const cors=require('cors')
const express=require('express');
//const stripe=require("stripe")("sk_test_51JUQKISIc19WDGdZSPx5nFT7iDQPAVtxX45Lbl7BNm9iJwgebrUPE9ASSLwwDBIhoCsRnTPu8vQwzp7R4TRou5Dx00E4NMc9YL")
const stripe=require("stripe")(process.env.KEY)
const{v4:uuidv4}=require('uuid')
require('dotenv').config()
const app=express()

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("Hello welcome to the backend")
})

app.post('/makepayment',(req,res)=>{
    const{token}=req.body;
    
    const idempontencyKey=uuidv4();
    return stripe.customers
    .create({
        email:token.email,
        source:token.id
    })
    .then(customer=>{
        stripe.charges.create({
            // amount:product.price*100,
            amount:100*100,
            currency:"INR*",
            customer:customer.id,
            reciept_email:token.email,
            // description:`purchased ${product.name}`,
           shipping:{
               name:token.card.name,
               address:{
                   country:token.card.address_country
               }
           }
        },{idempontencyKey})
    })
    .then(result=>res.status(200).json(result))
    .catch(err=>{
        res.status(422).json({error:err})
    })
})

app.listen(8080,()=>{
    console.log("Listening to port 8080")
    console.log(process.env.KEY)
})