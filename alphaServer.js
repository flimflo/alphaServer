const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
const path = require('path');
const { json } = require('body-parser')
const {DATABASE_URL, PORT} = require( './config' );
const  commentsRouter = require("./endpoints/comments");
const leaderboardRouter = require("./endpoints/leaderboard");
const authRouter = require("./endpoints/auth");
const newsRouter = require("./endpoints/news");
const weeklyMatchRouter = require("./endpoints/weeklyMatch");
const bestOfLeague = require("./endpoints/bestOfLeague");
const media = require("./endpoints/media")

app.use(cors())
app.use(json())

app.use(morgan('dev'));
app.use("/api/comments", commentsRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/news", newsRouter);
app.use("/api/weeklymatch", weeklyMatchRouter);
app.use("/api/best",bestOfLeague);
app.use("/api/media",media);
app.use("/api", authRouter);

app.use(express.static('./public'))
app.use('/admin', (req, res) => res.sendfile(path.join(__dirname, './public/admin.html')))
app.use('/reglamento', (req, res) => res.sendfile(path.join(__dirname, './public/reglamento.html')))
app.use('/patrocinadores', (req, res) => res.sendfile(path.join(__dirname, './public/sponsors.html')))
app.use('/about', (req, res) => res.sendfile(path.join(__dirname, './public/sobre_nosotros.html')))
app.use('/noticias', (req, res) => res.sendfile(path.join(__dirname, './public/noticias.html')))
app.use('/media', (req, res) => res.sendfile(path.join(__dirname, './public/media.html')))


app.listen(PORT, ()=>{
    console.log("This server is running on port 8080.")

    const settings = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    };

    new Promise((resolve, reject) =>{
        mongoose.connect(DATABASE_URL,settings,(err)=>{
            if(err){
                return reject(err);
            }
            else{
                console.log('Database connected successfully.')
                return resolve();
            }
        })
    })
    .catch(err =>{
        console.log(err);
      })
});