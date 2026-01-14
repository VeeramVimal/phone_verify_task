# phone_verify_task
Node Js, Express Js, Mongoose, Twilio and Mongo DB

Project: Build a backend NodeJS API server for phone number verification
Time: 1 to 2 days
Delivery Method: Github
Details:
Use NodeJS and ExpressJS to build an API server and MongoDB for persistent storage.
The server should essentially be able to verify a user's phone number using Twilio SDK (or any other SDK/API you can use to deliver SMS).
Design the APIs to accept the phone number, send a verification code to the entered phone number, verify the code and update the status on the user object. The verification codes will have a time limit of 2 minutes, after which it will expire and the user has to request the code again.
Use JWT to authorize APIs.
Modularize your code and add comments where appropriate, much like how you would code in production.
Deploy the API server using AWS API Gateway and Lambda.
Build a minimal frontend web page that showcases the functionality and verification process.
