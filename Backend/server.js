require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const Admin = require('./models/Admin')

const newsRoutes = require('./routes/NewsRoutes');
const suggestionRoutes = require('./routes/SuggestionRoutes');
const mediaBoxRoutes = require('./routes/MediaBoxRoutes');
const thoughtWordRoutes = require('./routes/ThoughtWordRoutes');
const profileRoutes = require('./routes/ProfileRoutes')
const treeRoutes = require('./routes/TreeRoutes')
const quizRoutes = require('./routes/Quiz');
const empRoutes = require('./routes/EmpRoutes')
const holidayRoutes = require('./routes/Holidays')
const OrgStructureRoutes = require('./routes/OrgStructureRoutes')
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));
const PORT = process.env.PORT ;
const url = "http://www.verteil.com/newsroom" 
connectDB();

// Routes
app.use('/api/news', newsRoutes);
app.use('/api/suggestions', suggestionRoutes);
app.use('/api/media', mediaBoxRoutes);
app.use('/api/thoughtword', thoughtWordRoutes);
app.use("/api/auth", profileRoutes);
app.use("/api/tree",treeRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/employee',empRoutes);
app.use('/api/holidays',holidayRoutes);
app.use('/api/orgtrees',OrgStructureRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

//authourisation

app.use(
  session(
    {
      secret:"secret",
      resave:false,
      saveUninitialized:true
    }
  )
)

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID:process.env.GOOGLE_CLIENT_ID,
  clientSecret:process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:"http://localhost:5000/auth/google/callback",
},
(accessToken,refreshToken,profile,done) => {
  const email = profile.emails?.[0]?.value;

  if(email.endsWith('@verteil.com') || email==='johannespabraham@gmail.com' || email==='johannesanjali@gmail.com' || email==='hannahvarghese2805@gmail.com' || email==='karthikh2004@gmail.com'){
    console.log("Logged in. Data =",{email},"details = ",{profile});
    return done(null,profile);
  }
  else{
    return done(null, false, {message:'Unauthorised access'})
  }
  
}
));

passport.serializeUser((user,done) => done(null,user));
passport.deserializeUser((user,done) => done(null,user));

app.get('/',(req,res) => {
  if (req.isAuthenticated()) {
    res.redirect('http://localhost:5173'); // logged in → go to React app
  } else {
    res.redirect('/auth/google'); // not logged in → start Google login
  }
});

app.get('/api/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

app.get("/auth/google",passport.authenticate('google',{scope:["profile","email"]}));

app.get("/auth/google/callback",
  passport.authenticate("google",{failureRedirect:"/unauthorised"}),
  (req,res) => {
    res.redirect("http://localhost:5000");
  }
);

app.get("/unauthorised",(req,res) => {
  res.status(403).send("Acess denied. Log in with company email.");
})

app.get("/profile",(req,res) => {
  res.send('Login successful')
});

app.get('/api/auth/is-admin', async(req,res) => {

    if(!req.isAuthenticated()){
        console.log(req)
        return res.status(401).json({isAdmin:false});
    }

    const email = req.user.emails?.[0]?.value;

    try{
      const isAdmin = await Admin.findOne({email});
      return res.json({isAdmin:!!isAdmin});x
    }
    catch(error){
      return res.status(500).json({error:"Internal error"});
    }

})

app.get('/logout',(req,res) => {
  req.logOut();
  res.redirect("/")
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));