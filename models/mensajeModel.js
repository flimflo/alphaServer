const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({

    content : {
        type : String,
        required : true,
    },
    section : {
        type : String,
        required : true,
    },
    approved : {
        type : Boolean,
        required: true,
        default: false
    },
    creation_date : {
        type : Date,
        required: true,
        default: Date.now
    }
})

const messageCollection = mongoose.model('messages', messageSchema);

const Messages = {
    getCommentsUsers : function(section){
        return messageCollection
            .find(section)
            .then(allMessages =>{
                return allMessages;
            })
            .catch(err => {
                return err;
            });
    },
    postMessageUsers : function(newMessage){
        return messageCollection
            .create(newMessage)
            .then( createdMessage => {
                return createdMessage;
            })
            .catch(err => {
                return err;
            });
    },
    getCommentsAdmin : function(section){
        return messageCollection
            .find(section)
            .then(allMessages =>{
                return allMessages;
            })
            .catch(err => {
                return err;
            });
    },
    updateMessages : function(messageId,messageObj){
        return messageCollection
        .updateOne(messageId,messageObj)
        .then(updatedMessage => {
            return updatedMessage;
        })
        .catch(err => {
            return err;
        });
    },
    deleteMessage : function(messageId){
        return messageCollection
        .deleteOne(messageId)
        .then(deletedMessage => {
            return deletedMessage;
        })
        .catch(err => {
            return err;
        });
    }
}

module.exports = {Messages};