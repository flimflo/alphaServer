const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({

    title : {
        type : String,
        required : true
    },
    image_url : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required: true
    },
    date : {
        type : String,
        required: true,
        default: "Fecha"
    },
    date_created : {
        type : Date,
        required: true,
        default: Date.now
    }
})

const weeklyMatchCollection = mongoose.model('weeklyMatch', newsSchema);

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
    }
}

module.exports = {weeklyMatch};