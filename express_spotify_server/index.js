// index.js
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/assets", express.static(path.join(__dirname, "assets")));



// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Atlas Connected"))
.catch(err => console.error("❌ MongoDB Error:", err));


const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);


app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const userExist = await User.findOne({ username });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password.length <= 6) {
      return res.status(400).json({ message: "Password is too short" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ message: "User Created Successfully" });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Server Error" });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid User" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const jwtToken = jwt.sign({ username }, "key");
    res.json({ jwt_token: jwtToken });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(2000, () => {
  console.log("🚀 Server running at http://localhost:2000/");
});


const songSchema = new mongoose.Schema({
  id: Number,
  name: String,
  avatar: String,
  file: String,
  artist: String,
  releasedDate: String,
  duration: String,
});

const Song = mongoose.model("Song", songSchema);




app.get("/getsongs", async (req, res) => {
  try {
    const allSongs = await Song.find();
    res.json(allSongs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching songs" });
  }
});



app.get("/getsongs/:id", async(req, res) => {
  const songId = parseInt(req.params.id);
  const allSongs = await Song.find();
  const song = allSongs.find((s) => s.id === songId);

  if (song) {
    res.json(song);
  } else {
    res.status(404).json({ message: "Song not found" });
  }
});
