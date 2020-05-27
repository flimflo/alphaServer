const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({

    equipoA : {
        type : String,
        required : true
    },
    equipoB : {
        type : String,
        required : true
    },
    cancha : {
        type : String,
        required: true
    },
    hora : {
        type : String,
        required: true
    }
})

const weeklySchema = mongoose.Schema({

    roles :[matchSchema],
    date: {
        type : String,
        required: true
    }
})

const weeklyMatchCollection = mongoose.model('weeklyMatch', weeklySchema);

const   weeklyMatch = {
    getWeeklyMatch : function(){
        return weeklyMatchCollection
            .find()
            .then(allWeeklyMatches =>{
                return allWeeklyMatches;
            })
            .catch(err => {
                return err;
            });
    },
    postWeeklyMatch : function(addWeeklyMatch){
        return weeklyMatchCollection
            .create(addWeeklyMatch)
            .then( createdMatch=> {
                return createdMatch;
            })
            .catch(err => {
                return err;
            });
    },
    deleteWeeklyMatch : function(){
        return weeklyMatchCollection
        .deleteMany({ })
        .then(deletedTable => {
            return deletedTable;
        })
        .catch(err => {
            return err;
        });
    }
}

module.exports = {weeklyMatch};