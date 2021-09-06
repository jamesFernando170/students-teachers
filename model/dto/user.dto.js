/**Packages */
const mongoose = require("mongoose");

//Aqui se realizaran los metodos que crean, editan, eliminan ...

/**Using schemas */
const schema = require("../schemas/user.schema");

schema.statics = {
    create: function(data, cb){
        let doc = new this(data);
        doc.save(cb);        
    },
    getAll: function(query, cb){
        this.find(query, cb);    
    },
    getByCode: function(query, cb){
        this.find(query, cb);        
    },
    login: function(query, cb){
        this.find(query, cb);        
    },
    update: function(query, data, cb){
        console.log(data);
        this.findOneAndUpdate(query, {$set: data}, {new: true}, cb);
    },
    delete: function(query, cb){
        this.findOneAndDelete(query);   
    }
};

const dto = mongoose.model("coll_user", schema);
module.exports = dto;