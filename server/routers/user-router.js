const express = require("express");
const userController = require("../controllers/user-controller");
const auth = require("../middlewares/auth");
const userRouter = express.Router();

userRouter.post("/registration", userController.registration);
userRouter.post("/login", userController.login);
userRouter.get("/getProfile", auth, userController.getProfile);
userRouter.patch("/updateProfile", userController.updateProfile);
userRouter.delete("/deleteProfile", userController.deleteProfile);
userRouter.delete("/updateTokens", userController.updateTokens);

module.exports = userRouter;