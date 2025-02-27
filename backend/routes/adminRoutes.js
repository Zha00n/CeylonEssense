require('dotenv').config();
const express = require('express');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken')
const router = express.Router();
const refreshTokens = [];


const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET);

const RE_JWT_SECRET = process.env.RE_JWT_SECRET;
console.log(RE_JWT_SECRET);



// Add superAdmin
router.post('/add-admin', async (req, res) => {
  try {
      const newAdmin = new Admin({
          username: req.body.username,
          password: req.body.password,
      });

      await newAdmin.save();
      res.status(201).send({ message: "admin added successfully!" });

  } catch (error) {
      console.error(error); 
      res.status(500).send({ error: "Failed to add admin!" });
  }
});




// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const users = [Admin];
    let user;

    for (const model of users) {
        user = await model.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            const accessToken = jwt.sign({ username: user.username}, process.env.JWT_SECRET, { expiresIn: '5m' });
            const refreshToken = jwt.sign({ username: user.username}, process.env.RE_JWT_SECRET, { expiresIn: '24h' });
            refreshTokens.push(refreshToken);
            return res.json({ accessToken, refreshToken});
        }
    }

    return res.status(401).send({ error: 'Invalid credentials' });
});




//Get refresh token
router.post('/token', (req, res) => {
    const refreshToken = req.body.refreshToken;
    if(refreshToken == null ) res.sendStatus(401);
    if(!refreshTokens.includes(refreshToken)) res.sendStatus(403);
    jwt.verify(refreshToken, process.env.RE_JWT_SECRET, (err, user) =>{
        if(err) res.sendStatus(403);
        const accessToken = jwt.sign({ username: user.username}, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ accessToken});
    });
});



// Logout
router.delete('/logout', (req, res) => {
  const refreshToken = req.body.refreshToken;
  refreshTokens = refreshTokens.filter(t=> t !== refreshToken);
  res.sendStatus(204);

  const accessToken = req.headers.accessToken;
  accessToken = accessToken.filter(t=> t !== accessToken);
  res.sendStatus(204);
  
});

module.exports = router;

