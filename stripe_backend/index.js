const cors =require("cors");
const express =require("express");

require("dotenv").config()
const stripe=require("stripe")(`{process.env.SECRET_KEY}`);
const uuid=require("uuid");


const app=express();


//middlewares
app.use(express.json());
app.use(cors());

//routes
app.get("/",(req,res)=>{
    res.send("it works at hsenidbot");
});

app.post("/payment",()=>{

    const {product, token}=req.body;
    console.log("PRODUCT",product);
    console.log("PRICE",product.price);
    const idempontencyKey =uuid();

    return stripe.customers.create({
        email:token.email,
        source:token.id
    }).then(customer=>{
        stripe.charges.create({
            amount: product.price*100,
            currency:'usd',
            customer:customer.id,
            receipt_email:token.email,
            description:product.name,
             shipping:{
                name:token.card.name,
                address:{
                    country:token.card.address_country
                }
             }



        },{idempontencyKey})
    })
    .then(result=>res.status(200).json(result))
    .catch(err =>console.log(err))


})



//listen
app.listen(8282,()=>console.log("Listening at port 8282"));