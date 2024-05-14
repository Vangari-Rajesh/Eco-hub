const { instance } = require("../app.js");
const User = require("../models/userModel.js");

const userMiddleware = require("../middlewares/user");// Assuming User model is imported

const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };

    console.log("instance === ", instance);
    const order = await instance.orders.create(options);
    console.log("after instance of the order = ", order);

    // Perform MongoDB changes
    const email = req.user.email; // Assuming user email is available in req.user
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Concatenate cart with boughtProducts and empty cart
    user.boughtProducts = user.boughtProducts.concat(user.cart);
    user.cart = [];

    // Save changes to the database
    await user.save();

    console.log("user in database -- ", user);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};

const paymentVerification = async (req, res) => {
  // Redirect the user to the customer profile page
  res.redirect("http://localhost:5001/customer-profile");
};

module.exports = { checkout, paymentVerification };
