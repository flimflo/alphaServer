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
    },
    /*getBookmarks : function(bookmarkTitle){
        return mensajeCollection
            .find(bookmarkTitle)
            .then(retrievedBookmarks =>{
                return retrievedBookmarks;
            })
            .catch(err => {
                return err;
            });
    },
    createBookmark : function(newBookmark){
        return mensajeCollection
            .create(newBookmark) //db.bookmarksdb.insert(newBookmark);
            .then( createdBookmark => {
                return createdBookmark;
            })
            .catch(err => {
                return err;
            });
    },
    deleteBookmark : function(bookmarkId){
        return mensajeCollection
        .deleteOne(bookmarkId)
        .then(deletedBookmark => {
            return deletedBookmark;
        })
        .catch(err => {
            return err;
        });
    },
    updateBookmark : function(bookmarkId,bookmarkObj){
        return mensajeCollection
        .update(bookmarkId,bookmarkObj)
        .then(updatedBookmark => {
            return updatedBookmark;
        })
        .catch(err => {
            return err;
        });
    }*/

    /*nameProperty : function(){

    },
    //nameProperty(){ //Declaración valida

    //}*/
}

module.exports = {Messages};