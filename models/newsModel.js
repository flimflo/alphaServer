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

const newsCollection = mongoose.model('articles', newsSchema);

const   News = {
    getNews : function(){
        return newsCollection
            .find()
            .then(allNews =>{
                return allNews;
            })
            .catch(err => {
                return err;
            });
    },
    postNews : function(Addnew){
        return newsCollection
            .create(Addnew)
            .then( createdNew=> {
                return createdNew;
            })
            .catch(err => {
                return err;
            });
    }
}

module.exports = {News};