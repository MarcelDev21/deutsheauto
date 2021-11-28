const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    image1:{type:Object, require:true},
    image2:{type:Object, require:true},
    image3:{type:Object, require:true},
    image4:{type:Object, require:true},
    image5:{type:Object, require:true},
})

module.exports = mongoose.model('imageSchema', ImageSchema)