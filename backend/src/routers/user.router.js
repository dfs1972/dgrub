import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";

const router = Router();
import { BAD_REQUEST } from "../constants/httpStatus.js";

router.post("./login", (req, res) => {
  const { email, password } = req.body;
  const user = sample_users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    res.send(generateTokenRespose(user));
    return;
  }

  // Login is invalid response
  res.status(BAD_REQUEST).send("Username or password is invalis.");
});

// Generate a login token
const generateTokenRespose = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "SomeRandomText",
    {
      expiresIn: "30d",
    }
  );

  return {
    id: user.id,
    email: user.email,
    address: user.address,
    isAdmin: user.isAdmin,
    token,
  };
};
