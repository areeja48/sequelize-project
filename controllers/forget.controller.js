
const db = require("../models");
const Forget = db.forgetPassword;

const User = db.user;
const Op = db.Sequelize.Op;

exports.forget = async (req, res) => {
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
    const otp = Math.floor(1000 + Math.random() * 9000);

    const otpExpier = new Date();
    const expirytime = otpExpier.setMinutes() + 10;

   const user1 = await Forget.create({
     username: req.body.username,
     email: req.body.email,
     otp: `${otp}`,
     time:  `${new Date()}`     
    });      
    const user2 = await User.destroy({
      where: {
      id: user.id
      }
    });
    res.json({
      data: "Your OTP is valid for 5 minutes. Pls use this otp to reset your password. ",
      email: req.body.email,
      otp: `${otp}`, 
      time:  `${new Date()}`          
     })                   
}
catch (err) {
}
}
