const jwt = require("jsonwebtoken");
require("dotenv").config();

function userMiddleware(req, res, next) {
    const auth_token = req.cookies.auth_token;
    console.log("token please --  - - - -   ",auth_token );
    if (!auth_token) {

        return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    try {
        const user = jwt.verify(auth_token, process.env.SECRET);
        console.log("user in middleware  -- ",user);
        req.user = user;
        // console.log("User Email:", req.user.email);
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            // Token has expired
            res.clearCookie("auth_token");
            return res.redirect('/');
        } else {
            // Token verification failed for some other reason
            res.clearCookie("auth_token");
            return res.status(401).json({ error: "Unauthorized. Please log in." });
        }
    }
}

module.exports = userMiddleware;
