const User = require("../models/User");
const { normalizeErrors } = require("../helpers/mongoose");
const jwt = require('jsonwebtoken');
const config = require('../config/dev')


const usersController = {};

usersController.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({
      errors: [{ title: "Data missing!", detail: "Provide email and password" }]
    });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).send({
        errors: [
          { title: "Invalid User!", detail: "User does not exists" }
        ]
      });
    }
    if(user.hasSamePassword(password)){
      // return JWT token
      const secret = config.JWT_SECRET;
      const expire = config.JWT_EXPIRATION;
      const token = jwt.sign({_id: user._id , username: user.username} , secret, {expiresIn: expire});
      return res.send({token});
    }else {
      console.log('not matched');
      
      return res.status(422).send({
        errors: [
          { title: "Wrong Data!", detail: "Wrong email or password" }
        ]
      });
    }
  } catch (err) {
    console.log('-----------------' ,err);
    return res.status(422).json({ errors: normalizeErrors(err.errors) });
  }
};

usersController.register = (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;
  if (!username || !email) {
    return res.status(422).send({
      errors: [{ title: "Data missing!", detail: "Provide email and password" }]
    });
  }
  if (password !== passwordConfirmation) {
    return res.status(422).send({
      errors: [
        {
          title: "Invalid password!",
          detail: "Password is not a same as confirmation!"
        }
      ]
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(422).json({ errors: normalizeErrors(err.errors) });
    }
    if (user) {
      return res.status(422).send({
        errors: [
          {
            title: "Invalid email!",
            detail: `User with this email: ${email} already exist!`
          }
        ]
      });
    }
    const newUser = new User({ username, email, password });
    newUser.save(function(err) {
      if (err) {
        console.log("=========================", err);

        return res.status(422).json({ errors: normalizeErrors(err.errors) });
      }
      return res.json({ registred: true });
    });
  });

  //   try {
  //     const user = User.findOne({ email });
  //     try {
  //     } catch (err) {
  //       return res.status(422).json({ errors: normalizeErrors(err) });
  //     }
  //   } catch (err) {}
};

usersController.authMiddlware = function(req, res,next){
  const token = req.headers.authorization;
  if (token) {
    const user = parsToken(token);
    User.findById(user._id , function(err , user){
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)})        
      }
      if (user) {
        res.locals.user = user;
        next();
      }else{
       return notAuthorized(res);
      }
    });
  }else{
    return notAuthorized(res);
  }
}

function parsToken(token){
  var decoded = jwt.verify(token.split(' ')[1] , config.JWT_SECRET);
  return decoded;
}

function notAuthorized(res) {
  return res.status(401).send({errors: [{title: 'Not authorized' , details: 'You need to login'}]})
}

module.exports = usersController;
