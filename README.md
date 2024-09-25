
# EcoHub - For Artisans 

Today, we face a big problem with a lot of waste in our society, which is harmful to people and animals. This happens because we buy and throw away things quickly, especially things we use once and then throw away. The way we get rid of our trash also makes the problem worse. Our plan is to improve how we deal with waste by turning things we use at home into new and useful things. This way, we can use them again instead of throwing them away. This not only helps the environment but also lets us create cool and useful items for our homes.

## Problem Statement

Empowering Sustainable Practices: Bridging Waste Contributors and Artisans Through an Innovative Upcycling App.


## Solution

**1) Web-App for Artisans :**
We generate a significant amount of household waste regularly.
This waste can be repurposed to create decorative and innovative products by collaborating with skilled artisans.
Anyone can contribute their household waste for this purpose, fostering a sense of community engagement.

**2) Web-App for Uploading Innovative products:**
Artisans can sell the creative products they make through a dedicated marketplace app.
This app exclusively focuses on providing a platform for showcasing and selling innovative products crafted by artisans.

## Tech Stack

**ReactJS** : Front-end framework

**NodeJS and Express** : Back-end

**MongoDB** : Database

## Workflow

![image](https://github.com/saiabhiramjaini/Resculpt-For_Artisans/assets/115941546/58143f09-9cce-41c7-8eb0-fa365b5e575f)




## EcoHub web-app for Artisans and Contributors 

![image](https://github.com/saiabhiramjaini/Resculpt-For_Artisans/assets/115941546/1b6ff47f-eabd-4ae2-9fb3-01a6c0b85581)




### App registration and login
Using a JWT token, users will be authenticated by providing their email, username, and password.

The 'bcrypt' package from Node.js will be utilized to securely store the user's password after hashing it, ensuring the password's security.

Upon successful account creation, users will need to log in.

After signing in, a JWT is generated and stored as a cookie in the browser.

The payload of the JWT contains the user's email, which is used in other routes. After the token expires, users will need to login again.

![image](https://github.com/saiabhiramjaini/Resculpt-For_Artisans/assets/115941546/ae064dbf-9bd3-4bee-b057-55358f322ddd)

![image](https://github.com/saiabhiramjaini/Resculpt-For_Artisans/assets/115941546/1c5e750b-4dcb-476f-9c1c-726278bb6a52)

![image](https://github.com/saiabhiramjaini/Resculpt-For_Artisans/assets/115941546/99536514-581c-4e20-b724-f39148fb6810)

## Frontend

**ReactJS:**

Front end of web-app is made using ReactJS and for styling I used tailwind.

I categorised my frontend into components and pages.

**1)Upload Requirements:**
After logging in, artisans can easily upload their material requirements.
For instance, if an artisan needs 10units of plastic bottles, they can use the upload page to fill a simple form specifying their needs for creating innovative products.

![image](https://github.com/saiabhiramjaini/Image-Encryption-Algorithm-Based-On-Genetic-Central-Dogma/assets/115941546/6330335c-2823-480b-a837-7575701cc1e2)

![image](https://github.com/saiabhiramjaini/Image-Encryption-Algorithm-Based-On-Genetic-Central-Dogma/assets/115941546/1e3a4d46-c389-4489-87e7-5bf8c1984f20)


**2)Visibility to Users:**
Uploaded requirements are visible to all users.
If a user has the requested material, such as plastic bottles, they can use the 'Contribute' button to offer their waste.


![image](https://github.com/saiabhiramjaini/Image-Encryption-Algorithm-Based-On-Genetic-Central-Dogma/assets/115941546/87e9bca7-196f-482d-a10d-8be056e94039)


**3)Contribution Process:**
Contributors' waste is collected by a delivery agent from their doorstep once the artisan's requirement is fulfilled.
The collected waste is then delivered to the artisan's location after successful payment.

![image](https://github.com/saiabhiramjaini/Resculpt-For_Artisans/assets/115941546/5d5e2fe2-c339-4ead-a83d-56eb4c5078ee)

**4)Innovative Product Creation:**
Upon receiving the contributed waste, artisans can use it to craft innovative products.
These products can be easily uploaded to the marketplace through the app for selling.

![image](https://github.com/saiabhiramjaini/Image-Encryption-Algorithm-Based-On-Genetic-Central-Dogma/assets/115941546/ce00da28-ac24-4d20-9b2c-85a24399f29f)


## Backend

**NodeJS and Express** : For this web app I created following folders in my backend :

    1) db - Database connection related code
    2) middlewares
    3) models
    4) routes
    5) utils

In the backend, I have organized the routes into three main categories:

 **1)User Routes:**

These routes handle all aspects of user authentication and profile-related data. Users can sign up, log in, and manage authentication-related tasks through these routes.

**2)Waste Requirement Routes:**

These routes facilitate the process of artisans specifying their waste requirements for creating innovative items. Artisans can upload details such as the type and quantity of raw materials needed. Once the uploaded waste requirement's quantity becomes zero, indicating that the artisan's requirement is satisfied, they can proceed to make a payment and receive the necessary raw materials.

**3)Innovative Products Routes:**

These routes are dedicated to managing the innovative products created by artisans. Artisans can upload their innovative items, which will be displayed in the marketplace (EcoHub-market). These routes provide access to all data related to innovative products, including creation, retrieval, and update operations.



This structure ensures a clear separation of concerns, making the backend more modular and maintainable. It also reflects a logical flow in the artisan's journey, from specifying waste requirements to receiving raw materials and finally creating and showcasing innovative items in the marketplace.

## Database

**MongoDB**

This is our web-app database. It is to be noted that this is common database for both the web-apps i.e. EcoHub - for Artisans and EcoHub - market.

So in total it contains 3 collections with names :

    1) users
    2) wastereqs
    3) innovativeprods
    4) marketUsers

You can see the schema in below images:

![image](https://github.com/saiabhiramjaini/Resculpt-For_Artisans/assets/115941546/c5dd6c2a-5e0f-42b1-99ad-55f883362a93)


![image](https://github.com/saiabhiramjaini/Resculpt-For_Artisans/assets/115941546/8ed51428-a735-4199-b628-a49c786aca03)

![image](https://github.com/saiabhiramjaini/Resculpt-For_Artisans/assets/115941546/a0778656-a897-4d24-8cc8-9a0b170bfdab)


![image](https://github.com/saiabhiramjaini/Resculpt-For_Artisans/assets/115941546/d3862c05-5b14-45d2-aed4-55b55b544281)


## Other services used 

**cloudinary** : for storing images

**stripe** : payments

**Lottie files** : animations

## Steps to fork this Repo :

    1) Fork from github
    2) Clone in to your local machine
    3) In root directory run these commands:
       cd frontend
       npm install
       cd ..
       cd backend
       npm install
    4) After installing node_modules come back to root directory again using:
       cd ..
    5) Run this command in root directory to start running:
       npm run dev
Note : Before running setup your .env as required 

    Contents present in .env are :

    PORT = 
    MONGO_URI = 
    SECRET = 

    CLOUDINARY_CLOUD_NAME = 
    CLOUDINARY_API_KEY = 
    CLOUDINARY_API_SECRET = 



## Author

- [@saiabhiramjaini](https://github.com/saiabhiramjaini)
- **Repositories :**
[https://github.com/saiabhiramjaini/Resculpt-For_Artisans](https://github.com/saiabhiramjaini/EcoHub-For_Artisans)

## Feedback 

If you have any feedback, please reach out me at abhiramjaini28@gmail.com

#   e c h o _ h u b  
 #   e c h o _ h u b  
 #   E c o - h u b  
 