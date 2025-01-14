const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const controller1 = require("../controllers/forget.controller");
const controller2 = require("../controllers/reset.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post(
      "/api/auth/signup",
      [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
      ],
      controller.signup
    );
  
    app.post("/api/auth/signin", controller.signin);
  
    app.post("/api/auth/signout", controller.signout);

    app.post("/api/auth/forget", controller1.forget);

    app.post("/api/auth/reset", controller2.reset);
  };