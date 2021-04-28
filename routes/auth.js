const router = require('express').Router();
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await db.User.findOne({
    email: req.body.email
  });
  if (emailExist) return res.status(400).send('Email already exists.');

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });
  try {
    const savedUser = await user.save();
    res.send({user: savedUser._id});
  }
  catch {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await db.User.findOne({
    email: req.body.email
  });
  if (!user) return res.status(400).send('User does not exist.');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password.');

  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

  res.header('Auth-Token', token).send(token);
});

module.exports = router;