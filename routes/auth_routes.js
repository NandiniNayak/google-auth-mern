const express = require("express");
const router = express.Router();
// const AuthenticationController = require("./../controllers/auth_controller");
const passport = require("passport");


/* GET Google Authentication API. */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
// router.get("/google", () => {
//   console.log("----GOOGLE-----")
// });

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  function(req, res) {
      console.log("AUTH GOOGLE")
      var token = req.user.token;
      res.redirect("http://localhost:3000?token=" + token);
  }
);

module.exports = router;