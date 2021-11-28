const mongoose = require('mongoose')
const AccessoireSchema = mongoose.Schema({
    bluetooth:{type:String},
    aireConditionné:{type:String},
    aireDeStationnement:{type:String},
    ABS:{type:String},
    radio:{type:String},
    kitMainLibre:{type:String},
    visiteTechnique:{type:String},
    jantes:{type:String},
    tempomat:{type:String},
    toitOuvrant:{type:String},
    systemeNavigation:{type:String},
    siegeChauffant:{type:String},
    siegeMassant:{type:String},
    phares:{type:String},
    idDelCoche:[{type: mongoose.Schema.Types.ObjectId, ref:"CreerVoiture"}],
})
module.exports = mongoose.model('AccessoireSchema', AccessoireSchema)