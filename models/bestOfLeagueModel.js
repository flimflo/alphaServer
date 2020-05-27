const mongoose = require('mongoose');

const bestOfLeagueSchema = mongoose.Schema({

    title : {
        type : String,
        required : true
    },
    image_url : {
        type : String,
        required : true
    },
    subtitle : {
        type : String,
        required: true
    }
})

const bestOfLeagueCollection = mongoose.model('bestOfLeague', bestOfLeagueSchema);

const   bestOfLeague = {
    getBestOfLeague : function(){
        return bestOfLeagueCollection
            .find()
            .then(allInfo =>{
                return allInfo;
            })
            .catch(err => {
                return err;
            });
    },
    postBestOfLeague : function(newCards){
        return bestOfLeagueCollection
            .create(newCards)
            .then( createdCards=> {
                return createdCards;
            })
            .catch(err => {
                return err;
            });
    },
    deletebestOfLeague : function(){
        return bestOfLeagueCollection
        .deleteMany({ })
        .then(deletedTable => {
            return deletedTable;
        })
        .catch(err => {
            return err;
        });
    }
}

module.exports = {bestOfLeague};