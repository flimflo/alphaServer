const mongoose = require('mongoose');

const leaderboardSchema = mongoose.Schema({

    teamName : {
        type : String,
        required : true
    },
    goals : {
        type : Number,
        required : true
    },
    goalsAgainst : {
        type : Number,
        required: true
    },
    points : {
        type : Number,
        required: true
    }
})

const leaderboardCollection = mongoose.model('leaderboardTable', leaderboardSchema);

const Leaderboard = {
    getLeaderboardTable : function(){
        return leaderboardCollection
            .find()
            .then(allTeams =>{
                return allTeams;
            })
            .catch(err => {
                return err;
            });
    },
    postLeaderboardTable : function(newTable){
        return leaderboardCollection
            .create(newTable)
            .then( createdTable=> {
                return createdTable;
            })
            .catch(err => {
                return err;
            });
    },
    deleteTable : function(){
        return leaderboardCollection
        .deleteMany({ })
        .then(deletedTable => {
            return deletedTable;
        })
        .catch(err => {
            return err;
        });
    }
}

module.exports = {Leaderboard};