const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const crypto =require("crypto");
require("dotenv").config();

const userMiddleware = require("../middlewares/user");
const User = require("../models/userModel");
const Payment = require("../models/Payment");
const innovativeProd = require("../models/innovativeProdModel");
const wasteReq = require("../models/wasteReqModel");


// const { instance } = require("../app.js");
const Razorpay=require('razorpay');
  

router.post("/signup", async(req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const cPassword = req.body.cPassword;
    res.cookie("email", email);
    // Input handling
    if (!username || !email || !password || !cPassword) {
        return res.json({msg : "All fields are required."});
    }
    if (!email.includes('@')) {
        return res.json({msg : 'Enter a correct email address.'});
    }    
    if(password.length<8){
        return res.json({msg : "Password should contain atleast 8 characters"})
    }
    if(password !== cPassword){
        return res.json({msg:"Password and Confirm password should be same"})
    }

    const existingUser = await User.findOne({ email});
    if (existingUser) {
        return res.json({msg: 'User already exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        username: username,
        email: email,
        password: hashedPassword,
    });

    await user.save();

    res.status(200).json({msg : 'User created successfully'} );
})

router.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
        return res.json({ msg: 'Incorrect email and password' });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
        const auth_token = jwt.sign({ email: email }, process.env.SECRET, { expiresIn: "20h" });
        res.cookie("auth_token", auth_token, {
            httpOnly: true,
        });

        // Return the user's email in the response
        return res.status(200).json({ msg: "Login successful", email: user.email });
    } else {
        return res.json({ msg: 'Incorrect email and password' });
    }
});

router.post("/logout", (req, res) => {
    // Clear the token or session
    res.clearCookie('auth_token');
    console.log("cleared cookie");
    // Optionally, perform any other cleanup tasks
    // For example, clear any user-related data stored in session
    res.status(200).json({ msg: "Logout successful" });
});

router.patch("/updateUsersInnovativeProd", userMiddleware, async (req, res) => {
    try {
        const userEmail = req.user.email;
        console.log(userEmail);
        const description = req.body.description;
        const product = await innovativeProd.findOne({ description });
        console.log(product)
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        const productId = product._id;
        const userDoc = await User.findOne({ email: userEmail });

        console.log(userDoc)

        if (!userDoc) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (!userDoc.innovativeProds) {
            userDoc.innovativeProds = [];
        }

        userDoc.innovativeProds.push(productId);
        await userDoc.save();

        res.json({ msg: "Product uploaded successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

router.get("/getUsersWasteReq" ,async (req, res) => {
    try {
        const userEmail = req.body
        const userDoc = await User.findOne({ email:userEmail });
        if (!userDoc) {
            return res.json({ msg: "User not found" });
        }

        const arrOfObjectIds = userDoc.wasteReq;

        const wasteReqDocuments = await wasteReq.find({ _id: { $in: arrOfObjectIds } });

        res.status(200).json({ wasteReqDocuments });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

router.get("/getUsersInnovativeProds", async (req,res)=>{
    try{
        const userEmail = req.body;
        const userDoc = await User.findOne({email: userEmail});
        if(!userDoc){
            return res.json({msg : "User not found"});
        }

        const arrOfObjectIds = userDoc.wasteReq;
        const wasteReqDocuments = await wasteReq.find({_id:{$in: arrOfObjectIds}});
        res.status(200).json({wasteReqDocuments});
    }catch(err){
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
})


router.get("/satisfiedRequirements", userMiddleware, async(req, res) => {
    try {
        const userEmail = req.user.email;
        const userDoc = await User.findOne({ email: userEmail });
        if (!userDoc) {
            return res.json({ msg: "User not found" });
        }

        const arrOfObjectIds = userDoc.wasteReq;

        const wasteReqDocuments = await wasteReq.find({
            _id: { $in: arrOfObjectIds },
            quantity: 0
        });

        res.status(200).json({wasteReqDocuments});
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});


router.get("/profile", userMiddleware, async(req,res)=>{
    const email = req.user.email;
    const user = await User.findOne({email});
    return res.json(user);
})

// for market profile

router.get('/user', userMiddleware, async (req, res) => {
    try {
        // Fetching user by email
        const email = req.user.email;
        const user = await User.findOne({ email: email });
  
        if (!user) {
            return res.status(404).send('User not found');
        }
  
        // Extracting boughtProducts and filtering out Stripe session IDs
        const boughtProducts = user.boughtProducts.map(product => {
            const { stripeSessionId, ...productDetails } = product;
            return productDetails;
        });
  
        // Sending the modified response
        res.json({
            username: user.username,
            email: user.email,
            boughtProducts: boughtProducts
        });
        // console.log(res.json)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
  });
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET
});


   

    
    
    // checkout api
    router.post("/checkout",async(req,res)=>{
        // console.log("in checkout ",req.body.title);
    
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
          };
          
          try {
            const order = await instance.orders.create(options);
            console.log(order);
            res.status(200).json({
              success: true,
              order
            });
          } catch (error) {
            console.error("Error creating order:", error);
            res.status(500).json({
              success: false,
              error: "Error creating order"
            });
          }
    
    })
    
    // payemnt verification
    router.post("/paymentverification", userMiddleware ,async(req,res)=>{
        console.log(" req =   ",req.body);
       const {messagu,razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
       console.log(razorpay_order_id," ",razorpay_payment_id," ",razorpay_signature," in razorpay verification")
       const body = razorpay_order_id + "|" +razorpay_payment_id;
       const expectedsgnature =crypto.createHmac('sha256',process.env.RAZORPAY_APT_SECRET).update(body.toString()).digest('hex')
       const isauth = expectedsgnature === razorpay_signature;
       if(isauth){
        await Payment.create({
            razorpay_order_id,razorpay_payment_id,razorpay_signature 
        })

        const email = req.user.email;
        const user = await User.findOne({ email: email });
        // if(messagu=="sigle"){
        //     const title=req.body;
        //     const product = await innovativeProd.findOneAndUpdate({ title:title },
        //         { $inc: { quantity: -1 } }, // Decrease quantity by 1
        //         { new: true });
        //         await User.findOneAndUpdate(
        //             { email: email },
        //             { 
        //                 $push: { boughtProducts: product } , // Add 'brought' contents to 'boughtProducts' array
        //                      },
        //             { new: true }
        //           );
        //           const msg=`Order Placed with order-id ${razorpay_order_id} and payment-id ${razorpay_payment_id}`
        //           res.redirect(`http://localhost:5173/cart?message=${encodeURIComponent(msg)}`)
            
            
        // }
        // if(messagu=="catr"){
        const brought=[];
        for(const item of user.cart){
            console.log(item+" item");
            item["order_id"]=razorpay_order_id;
            item["payment_id"]=razorpay_payment_id;
            brought.push(item);
            const product = await innovativeProd.findOneAndUpdate({ title:item.title },
                { $inc: { quantity: -1 } }, // Decrease quantity by 1
                { new: true });

        }
        await User.findOneAndUpdate(
            { email: email },
            { 
              $push: { boughtProducts: { $each: brought } }, // Add 'brought' contents to 'boughtProducts' array
             // Set the 'cart' field to an empty array
            },
            { new: true }
          );
          const msg=`Order Placed with order-id ${razorpay_order_id} and payment-id ${razorpay_payment_id}`;
          res.status(200).json(msg);
        //   const msg=`Order Placed with order-id ${razorpay_order_id} and payment-id ${razorpay_payment_id}`
        //   res.redirect(`http://localhost:5173/cart?message=${encodeURIComponent(msg)}`)
        // }
        }
        else{
            // const msg="Payment Failed! Please try again.";
            // res.redirect(`http://localhost:5173/cart?message=${encodeURIComponent(msg)}`)
 
        return  res.status(400).json("Transaction not valid ");
        }
    })
    
    router.post("/paymentverification-2", userMiddleware ,async(req,res)=>{
        // console.log(" req =   ",req.body);
       const {title,razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
       console.log(razorpay_order_id," ",razorpay_payment_id," ",razorpay_signature," in razorpay verification")
       const body = razorpay_order_id + "|" +razorpay_payment_id;
       const expectedsgnature =crypto.createHmac('sha256',process.env.RAZORPAY_APT_SECRET).update(body.toString()).digest('hex')
       const isauth = expectedsgnature === razorpay_signature;
       if(isauth){
        await Payment.create({
            razorpay_order_id,razorpay_payment_id,razorpay_signature 
        })

        const email = req.user.email;
        const user = await User.findOne({ email: email });
        console.log("title in pay-2 ",title);
        // const title=req.body;
            const product = await innovativeProd.findOneAndUpdate({ title:title },
                { $inc: { quantity: -1 } }, // Decrease quantity by 1
                { new: true });
              
                const pro=await innovativeProd.findOne({title:title});
                console.log("payment-2 product ",pro);
                pro.quantity=1;
                user.boughtProducts.push(pro);
                console.log("user brought ",user.boughtProducts);
                // await User.findOneAndUpdate(
                //     { email: email },
                //     { 
                //         $push: { boughtProducts: pro } , // Add 'brought' contents to 'boughtProducts' array
                //              },
                //     { new: true }
                //   );
                  const msg=`Order Placed with order-id ${razorpay_order_id} and payment-id ${razorpay_payment_id}`;
                  res.status(200).json(msg);
                 
                  }
                  else{

                  return  res.status(400).json("Transaction not valid ");
                  }
     
                });


module.exports = router;