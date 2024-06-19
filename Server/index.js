// import User from './User/user';
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const cors = require('cors');
const bodyParser= require('body-parser');
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://Bloomy:Adqj9h2q1oObaKxV@cluster0.pq4km7i.mongodb.net/MakerUser"
);

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", user);

// app.use('/api/user/',User);

app.use(cors({
  credentials : true,
  origin : ['http://localhost:4200']
}))

app.use(bodyParser.json())

app.post("/api/user/register", async (req, res) => {
  try {
    console.log("in reg",req.body)
    const {name, email, password} =req.body;
    console.log("reg", req.body);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!emailRegex.test(email)) {
        return {
          status: 500,
          data: {
            success: false,
            message: "Give a valid Email",
          },
        };
      }
      if ( !passwordRegex.test(password)
      ) {
        return {
          status: 500,
          data: {
            success: false,
            message: "Give valid password",
          },
        };
      }
      if (name.length<4 ) {
        return {
          status: 500,
          data: {
            success: false,
            message: "Give valid name with minimum length",
          },
        };
      }
    
    const checkuser = await User.findOne({ email: email });
    if (checkuser) {
      res.status(400).send({ error: "User Email exists already" });
    } else {
      const hasedpassword = await bcrypt.hash(password, 10);
      const user = await new User({ name, email, password: hasedpassword });
      user.save();
      res.status(201).send({ message: "User Registered Successfully" });
    }
  } catch (error) {
    res.status(400).send({ error: "User Registration Failed" });
  }
});

app.get("/api/user/fetch", async (req, res) => {
  try {
       
    const username = req.query.username;
    console.log("fetch", username);
    if (username.length<4 ) {    

      return {
        status: 500,
        data: {
          success: false,
          message: "Give valid name with minimum length",
        },
      };
    }
  
    let user = await User.findOne({ name: username });
    console.log(user);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    } else {
      return res.send({ user });
    }
  } catch (error) {
    res.status(500).send({ error: "Error fetching user details" });
  }
});

app.listen(3000, (req, res) => {
  console.log("At http://localhost:3000/");
});
