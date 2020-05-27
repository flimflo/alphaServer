const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
const path = require('path');
const { json } = require('body-parser')
const  commentsRouter = require("./endpoints/comments");
const leaderboardRouter = require("./endpoints/leaderboard");
const authRouter = require("./endpoints/auth");
const newsRouter = require("./endpoints/news");
const weeklyMatchRouter = require("./endpoints/weeklyMatch");
const bestOfLeague = require("./endpoints/bestOfLeague");

app.use(cors())
app.use(json())

app.use(morgan('dev'));
app.use("/api/comments", commentsRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/news", newsRouter);
app.use("/api/weeklymatch", weeklyMatchRouter);
app.use("/api/best",bestOfLeague);
app.use("/api", authRouter);

app.use(express.static('../Alpha_eventos_deportivos/public'))
app.use('/admin', (req, res) =>
    res.sendfile(path.join(__dirname, '../Alpha_eventos_deportivos/public/admin.html')))
app.use('/reglamento', (req, res) =>
    res.sendfile(path.join(__dirname, '../Alpha_eventos_deportivos/public/reglamento.html')))
app.use('/patrocinadores', (req, res) =>
    res.sendfile(path.join(__dirname, '../Alpha_eventos_deportivos/public/patrocinadores.html')))
app.use('/about', (req, res) =>
    res.sendfile(path.join(__dirname, '../Alpha_eventos_deportivos/public/sobre_nosotros.html')))
app.use('/noticias', (req, res) =>
    res.sendfile(path.join(__dirname, '../Alpha_eventos_deportivos/public/noticias.html')))


app.listen(8080, ()=>{
    console.log("This server is running on port 8080.")

    const settings = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    };

    new Promise((resolve, reject) =>{
        mongoose.connect('mongodb://localhost/Alpha',settings,(err)=>{
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