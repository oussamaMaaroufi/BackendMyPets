const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.js')
const passport = require('passport');


//Login
router.post('/auth', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;0
 // console.log(req.body)

  const query = { email}
  //Check the user exists
  User.findOne(query, (err, user) => {
    //Error during exuting the query
    if (err) {
      return res.send({
        success: false,
        message: 'Error, please try again'
      });
    }

    //No User match the search condition
    if (!user) {
      return res.send({
        success: false,
        message: 'Error, Account not found'
      });
    }

    //Check if the password is correct
    user.isPasswordMatch(password, user.password, (err, isMatch) => {

        //Invalid password
        if (!isMatch) {
          return res.send({
            success: false,
            message: 'Error, Invalid Password'
          });
        }

        //User is Valid

        const ONE_WEEK =  3000 ;//604800; //Token validtity in seconds

        //Generating the token
        const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: ONE_WEEK });

        //User Is Valid
        //This object is just used to remove the password from the retuned fields
        let returnUser = {
          name: user.name,
          email: user.email,
          type :user.type,
          _id: user._id
        }
      //  console.log(returnUser)

        //Send the response back
        return res.send({
          success: true,
          message: 'You can login now',
          user: returnUser,
          token
        });
    });

  });

});

//Registeration
router.post('/register', (req, res, next) => {
 
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    type:req.body.type,
    password: req.body.password
  });
  

  newUser.save((err, user) => {
    if (err) {
      console.log(err);
      return res.send({
        success: false,
        message: 'Failed to save the user'
      });
    }
    if (!user) {
      return res.send({
        success: false,
        message: 'Error, Invalid user'
      });
    }
    res.send({
      success: true,
      message: 'User Saved',
      user :user
    });
  });
});


//find  , passport.authenticate('jwt', { session : false})

router.post('/list', (req, res, next) => {
  //const owner = req.body.owner;
  User.find((err, users)=>{
    if (err) {
      return res.send({
        success: false,
        message: 'Error while reteriving the user'
      });
    }

    return res.send({
      success: true,
      users : users
    });
  });
});

// /getuser

router.post('/getuser', (req, res, next) => {
  // console.log(req.body);
  let _id  = req.body._id;
  let query = {_id}
  console.log(query);
  User.findById( query ,(err, user)=>{
    if (err) {
      return res.send({
        success: false,
        message: 'Error while reteriving the user'
      });
    }
    console.log(user);
    return res.send({
      success: true,
      user: user
    // user
    });
  });
});


module.exports = router;
