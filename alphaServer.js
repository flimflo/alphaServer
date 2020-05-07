const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
const  commentsRouter = require("./endpoints/comments");
const leaderboardRouter = require("./endpoints/leaderboard");
const authRouter = require("./endpoints/auth");
const { json } = require('body-parser')

app.use(cors())
app.use(json())

app.use("/comments", commentsRouter);
app.use("/leaderboard", leaderboardRouter);
app.use("", authRouter);

app.use(morgan('dev'));

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