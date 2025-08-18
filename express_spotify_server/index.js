const express = require('express')
const app = express()
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())
const router = express.Router();

app.use("/assets", express.static(path.join(__dirname, "assets")));

let db = null;

let songs = [
  {
    id: 1,
    name: "Shape of You",
    avatar: "/assets/covers/Shape_Of_You.png",
    file: "/assets/songs/Shape_Of_You.mp3",
    artist: "Ed Sheeran",
    releasedDate: "2017-01-06",
    duration: "03:59"
  },
  {
    id: 2,
    name: "Call Me by Your Name",
    avatar: "/assets/covers/call_by_name.png",
    file: "/assets/songs/Call_Me_By_Your.mp3",
    artist: "Lil Nas X along with its producers, Take a Daytrip, Omer Fedi, and Roy Lenzo",
    releasedDate: "2019-03-14",
    duration: "02:18"
  },
  {
    id: 3,
    name: "Dailamo Dailamo",
    avatar: "/assets/covers/Dailamo_Dailamo.png",
    file: "/assets/songs/Dailamo_Dailamo.mp3",
    artist: "S.P. Balasubrahmanyam, Gopika Poornima (Music: Vijay Antony)",
    releasedDate: "2006",
    duration: "04:26"
  },
  {
    id: 4,
    name: "Damn Damn",
    avatar: "/assets/covers/Damn_Damn.png",
    file: "/assets/songs/Damn_Damn.mp3",
    artist: "Benny Dayal, Sunidhi Chauhan (Music: Yuvan Shankar Raja)",
    releasedDate: "2013",
    duration: "03:57"
  },
  {
    id: 5,
    name: "Evanda Enakku Custody",
    avatar: "/assets/covers/Evanda_Enakku_Custody.png",
    file: "/assets/songs/Evanda_Enakku_Custody.mp3",
    artist: "Dhanush (Music: Sean Roldan)",
    releasedDate: "2017",
    duration: "03:32"
  },
  {
    id: 6,
    name: "Hosanna",
    avatar: "/assets/covers/Hosanna.png",
    file: "/assets/songs/Hosanna.mp3",
    artist: "Vijay Prakash, Suzanne D’Mello, Blaaze (Music: A.R. Rahman)",
    releasedDate: "2010",
    duration: "05:30"
  },
  {
    id: 7,
    name: "Idhu Varai",
    avatar: "/assets/covers/Idhu_Varai.png",
    file: "/assets/songs/Idhu_Varai.mp3",
    artist: "Yuvan Shankar Raja, Andrea Jeremiah",
    releasedDate: "2010",
    duration: "04:44"
  },
  {
    id: 8,
    name: "Kaattumalli",
    avatar: "/assets/covers/Kaattumalli.png",
    file: "/assets/songs/Kaattumalli.mp3",
    artist: "A.R. Rahman, Shashaa Tirupati",
    releasedDate: "2023",
    duration: "05:06"
  },
  {
    id: 9,
    name: "Kadhal Aasai",
    avatar: "/assets/covers/Kadhal_Aasai.png",
    file: "/assets/songs/Kadhal_Aasai.mp3",
    artist: "Hariharan, K. S. Chithra (Music: A.R. Rahman)",
    releasedDate: "2005",
    duration: "05:03"
  },
  {
    id: 10,
    name: "Kanmani Anbodu",
    avatar: "/assets/covers/Kanmani_Anbodu.png",
    file: "/assets/songs/Kanmani_Anbodu.mp3",
    artist: "Kamal Haasan, S. Janaki (Music: Ilaiyaraaja)",
    releasedDate: "1991",
    duration: "05:18"
  },
  {
    id: 11,
    name: "Love Nwantiti",
    avatar: "/assets/covers/Love_Nwantiti.png",
    file: "/assets/songs/Love_Nwantiti.mp3",
    artist: "CKay (Remix with Joeboy & Kuami Eugene)",
    releasedDate: "2019",
    duration: "03:08"
  },
  {
    id: 12,
    name: "Manike Mage Hithe",
    avatar: "/assets/covers/Manike_Mage_Hithe.png",
    file: "/assets/songs/Manike_Mage_Hithe.mp3",
    artist: "Yohani, Satheeshan Rathnayaka",
    releasedDate: "2020",
    duration: "02:42"
  },
  {
    id: 13,
    name: "Mascara Pottu",
    avatar: "/assets/covers/Mascara_Pottu.png",
    file: "/assets/songs/Mascara_Pottu.mp3",
    artist: "Anirudh Ravichander, Hiphop Tamizha",
    releasedDate: "2014",
    duration: "04:56"
  },
  {
    id: 14,
    name: "Middle Of The Night",
    avatar: "/assets/covers/Middle_Of_The.png",
    file: "/assets/songs/Middle_Of_The.mp3",
    artist: "Elley Duhé",
    releasedDate: "2017",
    duration: "03:02"
  },
  {
    id: 15,
    name: "Muththa Mazhai",
    avatar: "/assets/covers/Muththa_Mazhai.png",
    file: "/assets/songs/Muththa_Mazhai.mp3",
    artist: "Hariharan, Harini (Music: Vidyasagar)",
    releasedDate: "2001",
    duration: "03:46"
  },
  {
    id: 16,
    name: "Ondra Iranda",
    avatar: "/assets/covers/Ondra_Iranda.png",
    file: "/assets/songs/Ondra_Iranda.mp3",
    artist: "Karthik, Suchitra (Music: Harris Jayaraj)",
    releasedDate: "2003",
    duration: "04:52"
  },
  {
    id: 17,
    name: "Otha Thamarai",
    avatar: "/assets/covers/Otha_Thamarai.png",
    file: "/assets/songs/Otha_Thamarai.mp3",
    artist: "Naresh Iyer, V.V. Prasanna (Music: Vidyasagar)",
    releasedDate: "2008",
    duration: "03:40"
  },
  {
    id: 18,
    name: "Ottaiyanum Senja Thara",
    avatar: "/assets/covers/Ottaiyanum_Senja_Thara.png",
    file: "/assets/songs/Ottaiyanum_Senja_Thara.mp3",
    artist: "Yuvan Shankar Raja",
    releasedDate: "2006",
    duration: "05:00"
  },
  {
    id: 19,
    name: "Piravi",
    avatar: "/assets/covers/Piravi.png",
    file: "/assets/songs/Piravi.mp3",
    artist: "Vijay Yesudas (Music: G.V. Prakash Kumar)",
    releasedDate: "2011",
    duration: "04:36"
  },
  {
    id: 20,
    name: "Pogiren",
    avatar: "/assets/covers/Pogiren.png",
    file: "/assets/songs/Pogiren.mp3",
    artist: "Naresh Iyer, Andrea Jeremiah (Music: Yuvan Shankar Raja)",
    releasedDate: "2006",
    duration: "04:03"
  },
  {
    id: 21,
    name: "Vaarayo Vaarayo",
    avatar: "/assets/covers/Vaarayo_Vaarayo.png",
    file: "/assets/songs/Vaarayo_Vaarayo.mp3",
    artist: "Hariharan, Saindhavi (Music: Harris Jayaraj)",
    releasedDate: "2009",
    duration: "05:16"
  }
];




const initializer = async ()=>{
    try{
        db = await open({
            filename:path.join(__dirname,'spotify.db'),
            driver: sqlite3.Database,
        })

        await db.run(
            `create table if not exists user(
            id integer primary key autoincrement,
            username text unique not null,
            password text not null
            );`
        )

        app.listen(2000, ()=>{
            console.log('server: http://localhost:2000/')
        })
    } catch(e) {
        console.log(`DB console.error: ${e.message};
        `)
    }
}

initializer()

app.use("/", router);

router.get("/getsongs", (req, res) => {
  res.json(songs);
});

router.get("/getsongs/:id", (req, res) => {
  const songId = parseInt(req.params.id)
  const song = songs.find(s => s.id === songId)

  if (song) {
    res.json(song)
  } else {
    res.status(404).json({ message: "Song not found" })
  }
})



app.post('/signup', async(request, response)=>{
    try{
        const{username,password} = request.body
        let data = `select * from user where username=?;`
        const userExist = await db.get(data,[username])
        if (userExist){
            response.status(400)
            response.json({ message: "User already exists" });
        }else if(password.length<=6){
            response.status(400)
            response.json({ message: "Password is too short" });
        }else{
            const hashedpassword = await bcrypt.hash(password,10)
            const create_query = `insert into user(username,password) values (?,?);`
            await db.run(create_query,[username,hashedpassword])
            response.status(200)
            response.json({message:'User Created Successfully'})
            
        }
    } catch(e) {
        console.log(e.message)
        response.status(500).send('server error')
    }
})

app.post('/login', async (request, response)=>{
    try{
        const {username,password} = request.body 
        const usernameCheck = `select * from user where username = ?;`
        const userdata = await db.get(usernameCheck,[username])
        if(!userdata){
            response.status(400).json({message:'Invalid user'})
        }else{
            const passwordDecrpt = await bcrypt.compare(password, userdata.password)
            if(passwordDecrpt){
                const jwtToken = jwt.sign({username:username},'key')
                response.json({jwt_token: jwtToken})
            }else{
                response.status(400).json({message:'Invalid Password'})
            }
        }
    }catch (e){
        console.log(e.message)
        response.status(500).json({message:'server error'})
    }
})

