const mongoose = require('mongoose');

const mediaSchema = mongoose.Schema({

    title : {
        type : String,
        required : true
    },
    image_url : {
        type : String,
        required : true
    },
    media_type :{
        type : String,
        required: true
    },
    content : {
        type : String,
        required: false
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

const mediaCollection = mongoose.model('media', mediaSchema);

const   Media = {
    getMediaPhoto : function(photo){
        return mediaCollection
            .find(photo)
            .then(allMedia =>{
                return allMedia;
            })
            .catch(err => {
                return err;
            });
    },
    getMediaVideo : function(video){
        return mediaCollection
            .find(video)
            .then(allMedia =>{
                return allMedia;
            })
            .catch(err => {
                return err;
            });
    },
    postMedia : function(addMedia){
        return mediaCollection
            .create(addMedia)
            .then( createdMedia=> {
                return createdMedia;
            })
            .catch(err => {
                return err;
            });
    }
}

module.exports = {Media};