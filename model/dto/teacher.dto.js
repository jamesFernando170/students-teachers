/**Packages */
const mongoose = require("mongoose");

//Aqui se realizaran los metodos que crean, editan, eliminan ...

/**Using schemas */
const schema = require("../schemas/teacher.schema");

schema.statics = {
    create: function(data, cb){
        let doc = new this(data);
        doc.save(cb);        
    },
    getAll: function(query, cb){
        this.find(query, cb);    
    },
    getByDocument: function(query, cb){
        this.find(query, cb);        
    },
    update: function(query, data, cb){
        this.findOneAndUpdate(query, {$set: data}, {new: true}, cb);
    },
    delete: function(query, cb){
        this.findOneAndDelete(query, cb);   
    }
};

const dto = mongoose.model("coll_teacher", schema);
module.exports = dto;