const express = require('express');
const app = express();
const path = require('path');
const Razorpay = require('razorpay');


app.use(express.static('./views'));

app.use(express.json());

app.get('/', (req, res)=>{
    return res.render('index');
})

app.post('/order', async (req,res)=>{
    
    try {
        const amount = req.body.amount;

         var instance = new Razorpay({
         key_id: 'rzp_test_2qhBPsql7fdgkC', 
         key_secret: 'XIWJE5I8hkX3eEIaPwoRTICh' });


        const myOrder = await instance.orders.create({  
        amount: amount*100,  currency: "INR",  receipt: "receipt#1"
        });
       


     res.status(200).json({
         success: true,
         amount,
         order: myOrder
     });
    } catch (error) {
        console.log('getting error in order in index.js route',error);
        return;
    }
});
app.listen(4000, ()=>{
    console.log("server is up and running on port 4000");
})