const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const saltRounds = 10
const pwdtoken = process.env.pwdtoken

module.exports = {
  signIn: function (req, res) {
    let email = req.body.email
    let password = req.body.password

    if (email == "" || password == "") {
      res.status(400).json({
        message: "email / Password must be filled"
      })
    } else {
      User.findOne({email})
        .then(user => {
          if (!user) {
            res.status(406).json({
              message: "Email / Password is Wrong"
            })
          } else {
            bcrypt.compare(password, user.password, function (err, result) {
              if (err) {
                res.status(500).json({
                  message: "Something went Wrong"
                })
              } else {
                if (result) {
                  let token = jwt.sign({id: user._id, email: user.email, role: user.role}, pwdtoken)
                  res.status(200).json({
                    message: "User Login Succesfully",
                    user,
                    token
                  })
                }else{
                  res.status(406).json({
                    message: "Password is Wrong"
                  })
                }
              }
            })
          }
        })
        .catch(err => {
          // console.log(err);
          res.status(500).json({
            message: "email / Password is wrong, Email is case Sensitive",
            err
          })
        })
    }
  },
  signUp: function (req, res) {
    // console.log(req.body);
    let plainPassword = req.body.password
    let cekPass = plainPassword.match(/[0-9]/g)
    let cekFormatEmail = validateEmail(req.body.email)

    User.findOne({email: req.body.email})
      .exec()
      .then(users => {
        // console.log('Users ',users);
        if (users) {
          res.status(406).json({
            message: "email is not available"
          })
        } else {
          if (!cekFormatEmail) {
            res.status(406).json({
              message: "Email Format is wrong"
            })
          } else if (plainPassword.length < 5) {
            res.status(406).json({
              message: "password minimal 5"
            })
          } else if (cekPass === null) {
            res.status(406).json({
              message: "Password must contained number"
            })
          } else {
            bcrypt.hash(plainPassword, saltRounds, function (err, hash) {
              let newUser = {
                name: req.body.name,
                email: req.body.email,
                password: hash
              }
              saveUser(newUser, req, res)
            })
          }
        }
      })
      .catch(err => {
        res.status(500).json({
          message: err
        })
      })
  },
  // profile optional, kaya ga perlu
  profile: function (req, res) {
    let token = req.headers.token
    let decoded = jwt.verify(token, pwdtoken)

    User.findOne({_id:decoded.id})
      .then(user => {
        if (!users) {
          res.status(401).json({
            message: "User not found"
          })
        } else {
          res.status(200).json({
            message: "User data found",
            user
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: err
        })
      })
  },
  tokenCheck: function (req, res) {
    if (req.headers.token) {
      let token = req.headers.token
      jwt.verify(token, pwdtoken, function (err, decoded) {
        if (err) {
          res.status(500).json({
            message: 'token is invalid'
          })
        } else {
          User.findOne({_id:decoded.id, email:decoded.email})
            .then(users => {
              if (!users) {
                res.status(401).json({
                  message: "Token invalid",
                  states: false
                }) 
              } else {
                res.status(200).json({
                  message: "Token is valid",
                  states: true,
                  user: users
                }) 
              }
            })
            .catch(err => {
              res.status(500).json({
                message: err
              })
            })
        }
      })
    } else {
      res.status(403).json({
        message: 'U need to Login'
      })
    }
  }
}

validateEmail = function (email) {
  // console.log('Masuk Kesini');
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

saveUser = function (objUser, req, res) {
  // console.log(objUser);
  let newUser = new User ({
    name: objUser.name,
    email: objUser.email,
    password: objUser.password,
    role: "user"
  })

  //nanti masukin token jwt
  newUser.save((err, user) => {
    if (err) {
      res.status(500).json({
        message: err
      })
    } else {
      res.status(201).json({
        message: `User has Succesfully added`,
        user: user
      })
    }
  })
}