const express = require("express")
const cookieParser = require("cookie-parser");
const app = express();
const paymentRoute = require("./routes/userRoutes.js");
const Razorpay=require('razorpay');


require("dotenv").config();
const cors = require("cors");

const connectDB = require("./db/connect");

const userRouter = require("./routes/userRoutes");
const wasteReqRouter = require("./routes/wasteReqRoutes");
const innovativeProdRouter = require("./routes/innovativeProdRoutes");

const cartRouter =require("./routes/cart")

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend domain
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true })); // to resolve payload large error

app.use(userRouter);
app.use(wasteReqRouter);
app.use(innovativeProdRouter);

app.use(cartRouter);

connectDB(process.env.MONGO_URI);
const instance = new Razorpay({   key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET, });


app.use("/api", paymentRoute);

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);
module.exports = { instance };



app.listen(process.env.PORT, ()=>{
    console.log("Server running on port " + process.env.PORT);
})