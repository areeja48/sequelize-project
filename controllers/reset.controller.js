const db = require("../models");
const config = require("../config/auth.config");
const Reset = db.forgetPassword;

const User = db.user;
const User1 = db.forgetPassword;

const Op = db.Sequelize.Op;


exports.reset = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });  
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    
    const email = await User.findOne({
      where: {
        email: req.body.email,
      },
    });   

    if (!email) {
      return res.status(404).send({ message: "Email Not found." });
    }
  }
  catch (err) {
  }
  
 try {
     const email = await User1.findOne({
    where: {
      email: req.body.email,
    },
  });   

  if (!email) {
    return res.status(404).send({ message: "Email is not matching." });
  }
  
    const otp = await User1.findOne({
      where: {
        otp: req.body.otp,
      },
    });
  
    if (!otp) {
      return res.status(404).send({ message: "OTP  is not matching." });
    }
  
    res.json({
    data: "Your Password has been reset, pls signup as new user.",
                   
     }) 

  const user2 = await User.destroy({
      where: {
      id: user.id
      }
    });
  }      
 catch (err) {

  }
}