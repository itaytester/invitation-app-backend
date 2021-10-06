const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const uri =
  "mongodb+srv://itaytester:Aa123456@cluster0.9inzn.mongodb.net/Invitations?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected To Mongo Cluster!");
});

const app = express();
app
  .use(
    express.urlencoded({
      extended: true,
    })
  )
  .use(cors())
  .use(express.json())
  .get("/users", async (req, res) => {
    const users = await User.find();
    res.send(users);
  })
  .post("/addUser", async (req, res) => {
    const user = req.body;
    user.status = "Disabled";
    const newUser = new User(user);
    const doc = await newUser.save();
    res.send(doc);
  })
  .post("/setUserStatus/:id/:status", async (req, res) => {
    const { id, status } = req.params;
    await User.updateOne({ _id: id }, { $set: { status } });
    res.send("hello from api!");
  })
  .delete("/deleteUsers", async (req, res) => {
    const ids = req.body.ids;
    await User.deleteMany({
      _id: {$in: ids}
    });
    res.send("hello from api!");
  })
  .listen(8080, () => {
    console.log(`server has started on 8080`);
  });
