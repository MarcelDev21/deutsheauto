const mongoose = require('mongoose')

const CreerVoitureSchema = mongoose.Schema({
    //image,marque,model,immatriculation,moteur,puissance,indice,rapports,typeVehicule,portières,couleur,habitacle,etat,prix,prixApproximatif
    image:{type:Object},
    marque:{type:String,lowercase: true},
    model:{type:String},
    immatriculation:{type:String},
    moteur:{type:String},
    puissance:{type:String},
    indice:{type:String},
    rapports:{type:String},
    typeVehicule:{type:String},
    portières:{type:Number},
    couleur:{type:String},
    habitacle:{type:String},
    etat:{type:String},
    prix:{type:Number},
    prixApproximatif:{type:Number},
    qualitéVoiture:{type:String},
    description:{type:String},
    lieuDuVehicule:{type:String},
    AccessoireSchema:[{type:mongoose.Types.ObjectId, ref:"AccessoireSchema"}],
    autreImage:[{type:mongoose.Types.ObjectId, ref:"imageSchema"}]
})

module.exports = mongoose.model('CreerVoiture', CreerVoitureSchema)