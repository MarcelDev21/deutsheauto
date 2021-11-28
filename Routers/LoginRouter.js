const  express = require('express')
const appBoris = express.Router()
const LoginSchema = require('../Models/LoginModel')
const CreerVoiture = require('../Models/CreerVoitureModel')
const AccessoireSchema = require('../Models/AccesoireModel')
const AutreImage = require('../Models/AutreImage')
const nodemailer = require("nodemailer");
const {isAuthenticated} = require('../midlewares/auth')

const MailModelSchema = require('../Models/MailModel')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const tokenValidation = require('../midlewares/tokenValidation')
const salt = bcrypt.genSaltSync(10)

const {TOKENENV,USERACOUNTMAIL,PASSWORDUSERACCOUNT,PASSWORDDEUTCH}= process.env

appBoris.post('/login', async(req,res) => {
    try {
        let {nom,password} = req.body
        
        if(!nom){
            return res.json({success:false, message:"Entrer votre nom"}) 
         }
         if(!password){
            return res.json({success:false, message:"Entrer votre password"}) 
         }

         let findByNom = await LoginSchema.findOne({nom})
         const myBcrypt = await bcrypt.compare(password, findByNom.password)

      
      if(myBcrypt == false){
        return res.json({success:false, message:'ce mot de passe n existe pas'})
      }else{
        let id
        const token = jwt.sign({id: findByNom._id}, TOKENENV, {expiresIn: "2h"})
        return res.json({success:true, findByNom, token, message:'existe'})
      }
     
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
})

appBoris.post('/createUser', async(req,res)=>{
    try {
       let {nom,password} = req.body
       const hashPassword = bcrypt.hashSync(password, salt)
       password = hashPassword
       let newLoginSchema = new LoginSchema({nom,password})
       let newPost = await newLoginSchema.save()
       return res.json({success:true, newPost})
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
})

appBoris.post('/creerVoiture',tokenValidation, async(req,res) => {
    try {
        const {image,marque,model,immatriculation,moteur,puissance,indice,rapports,typeVehicule,portières,couleur,habitacle,etat,prix,description,lieuDuVehicule,prixApproximatif,qualitéVoiture} = req.body
        if(!image){
            return res.json({success:false, message:"entrer votre image"})  
        }
        if(!marque){
            return res.json({success:false, message:"entrer votre marque"})  
        }
        if(!model){
            return res.json({success:false, message:"entrer votre model"})  
        }
        if(!immatriculation){
            return res.json({success:false, message:"entrer votre immatriculation"})  
        }
        if(!moteur){
            return res.json({success:false, message:"entrer votre moteur"})  
        }
        if(!puissance){
            return res.json({success:false, message:"entrer votre puissance"})  
        }
        if(!indice){
            return res.json({success:false, message:"entrer votre indice"})  
        }
        if(!rapports){
            return res.json({success:false, message:"entrer votre rapports"})  
        }
        if(!typeVehicule){
            return res.json({success:false, message:"entrer votre type Vehicule"})  
        }
        if(!portières){
            return res.json({success:false, message:"entrer le nombre de portières"})  
        }
        if(!couleur){
            return res.json({success:false, message:"entrer la couleur"})  
        }
        if(!habitacle){
            return res.json({success:false, message:"entrer l habitacle"})  
        }
        if(!etat){
            return res.json({success:false, message:"entrer l etat"})  
        }
        if(!prix){
            return res.json({success:false, message:"entrer le prix"})  
        }
        if(!prixApproximatif){
            return res.json({success:false, message:"entrer le prix Approximatif"})  
        }
        if(!qualitéVoiture){
            return res.json({success:false, message:"entrer la qualitéVoiture"})  
        }

        if(etat === "Etat de la voiture"){
            return res.json({succes: false, message:"entrer l'etat de voiture qui convient"})
        }
        if(!description){
            return res.json({success:false, message:"entrer la description"}) 
        }
        if(!lieuDuVehicule){
            return res.json({success:false, message:"entrer le lieu ou se trouve le vehicule"}) 
        }

        
       
        let newVoiture = new CreerVoiture({image,marque,model,immatriculation,moteur,puissance,indice,rapports,typeVehicule,portières,couleur,habitacle,etat,prix,description,lieuDuVehicule,prixApproximatif,qualitéVoiture})
        //let newVoiture = new CreerVoiture({image,marque})
        /*if(newVoiture.etat == "Etat de la voiture"){
            return res.json({succes: false, message:"entrer l'etat de voiture qui convient"})
        }*/
        let nouvelleVoiture = await newVoiture.save()
       // console.log("test")
        return res.json({success: true, nouvelleVoiture, message:"enregistrez avec succès"})
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
})

appBoris.get('/recupereVoitue', tokenValidation, async(req,res)=>{
    try {
        const getCar = await CreerVoiture.find()
        return res.json({success:true, getCar, message:'bien recu'})
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
})

appBoris.get('/recupereInfoVoiture/:id', tokenValidation, async(req,res)=>{
    try {
       const {id} = req.params 
       const getVoiture = await CreerVoiture.findById(id)
       return res.json({succes:true, getVoiture, message:"effectuer avec succes"})
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
})

appBoris.delete('/deleteVoiture/:id', tokenValidation, async(req,res)=>{
    try {
        const {id} = req.params
        const voitureASupprimer = await CreerVoiture.findByIdAndDelete(id)
        return res.json({succes:true, voitureASupprimer, message:"La suppression est faite avec succes"})
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
})

appBoris.get('/qualiteVoiture', async(req,res)=>{
    try {
       const qualitéVoiture = "luxe"
       const typeQualité = await CreerVoiture.find({qualitéVoiture})
       return res.json({succes:true, typeQualité, message:"effectuer avec succes"})
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
})

appBoris.get('/qualiteVoitureOccasion', async(req,res)=>{
    try {
       const qualitéVoiture = "Occasion"
       const typeQualité = await CreerVoiture.find({qualitéVoiture})
       return res.json({succes:true, typeQualité, message:"effectuer avec succes"})
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
})

appBoris.get('/RechercheDetailVoiture/:id', async(req,res)=>{
    try {
       const {id} = req.params
       const detailVoiture = await CreerVoiture.findById(id)
       return res.json({succes:true, detailVoiture, message:"le detail de votre Voiture"})
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
})

appBoris.post('/RechercherMaque', async(req,res)=> {
   try {
    const {marque} = req.body
    if(!marque){
        return res.json({succes:false, message:'vous n avez pas entrer la marque'}) 
    }
    const findByMarque = await CreerVoiture.find({marque})
    return res.json({succes:true, findByMarque})
   } catch (error) {
    return res.json({succes:false, message:error.message})
   }
})

appBoris.post('/ajouteAccessoire/:idDeLaVoiture', tokenValidation, async(req,res)=>{
    try {
     const {bluetooth,aireConditionné,aireDeStationnement,ABS,radio,kitMainLibre,visiteTechnique,jantes,tempomat,toitOuvrant,systemeNavigation,siegeChauffant,siegeMassant,phares} = req.body
     const {idDeLaVoiture} = req.params
      // console.log(req.user.id)
     const id = await LoginSchema.findById(req.user.id)
     /*if(!bluetooth){
        return res.json({succes:false, message:"specifie le bluetooth"})
     }*/
     if(!idDeLaVoiture){
         return res.json({succes: false, message:"Vous devez creer une voiture"})
     }
     const createAccesoireCoche = new AccessoireSchema({bluetooth,aireConditionné,aireDeStationnement,ABS,radio,kitMainLibre,visiteTechnique,jantes,tempomat,toitOuvrant,systemeNavigation,siegeChauffant,siegeMassant,phares})
     const newCoche = await createAccesoireCoche.save()
     //console.log(newCoche._id)
     //modifier l etat de la voiture
     const updateVoiture = await CreerVoiture.findByIdAndUpdate(idDeLaVoiture, {$push:{AccessoireSchema : newCoche._id}} , {new: true})
     //console.log(createAccesoireCoche)
     
     res.json({succes:true, updateVoiture, message:'options enregistrées avec succes'})
    } catch (error) {
     return res.json({succes:false, message:error.message})
    }
 })

 appBoris.get('/averiguarPertenenciaDelCoche/:idAccesoire/:idAccessoire2', tokenValidation, async(req,res)=>{
    try {
        const {idAccesoire,idAccessoire2} = req.params   
        const findMyID = await CreerVoiture.findById(idAccesoire)
        //console.log(findMyID.AccessoireSchema)
        
        let id, miIdAccesoire;
        for(let i =0; i<findMyID.AccessoireSchema.length; i++){
            id = findMyID.AccessoireSchema[i]
            if(id == idAccessoire2){
                //"617958bb2a8723faf3abace7"
                miIdAccesoire = id
                //console.log("je le trouve" + id)        
            }
        }
     const recupereDataAccessoire = await AccessoireSchema.findById(miIdAccesoire)
     //console.log(recupereDataAccessoire)

    return res.json({succes: true, recupereDataAccessoire})
    } catch (error) {
     return res.json({succes:false, message:error.message})
    }
 })

 appBoris.put('/ModifiervVehicule/:id', tokenValidation, async(req,res)=>{
     try {
         const {id} = req.params
         const {image,marque,model,immatriculation,moteur,puissance,indice,rapports,typeVehicule,portières,couleur,habitacle,etat,prix,prixApproximatif,qualitéVoiture} = req.body
         //let newVoiture = new CreerVoiture({image,marque,model,immatriculation,moteur,puissance,indice,rapports,typeVehicule,portières,couleur,habitacle,etat,prix,prixApproximatif,qualitéVoiture})
        
         const verifId = await CreerVoiture.findById(id)
         if(!verifId){
             res.json({succes: false, message:"cette voiture n existe plus"})
         }
        
         const modifierVoiture = await CreerVoiture.findByIdAndUpdate(id,{image,marque,model,immatriculation,moteur,puissance,indice,rapports,typeVehicule,portières,couleur,habitacle,etat,prix,prixApproximatif,qualitéVoiture}, {new:true})
         return res.json({succes: true, modifierVoiture, message:"Votre modification a été éffectuée avec succès"})
     } catch (error) {
        return res.json({succes:false, message:error.message})  
     }
 })

 appBoris.get('/actualisationId/:id', tokenValidation,async(req,res)=>{
    try {
        const {id} = req.params
        const actualisationId = await CreerVoiture.findById(id)
        //console.log(actualisationId)
        if(!actualisationId || actualisationId == null){
            return res.json({succes:false, message:"cette voiture n existe pas"})  
        }
        return res.json({succes:true, actualisationId})
    } catch (error) {
       return res.json({succes:false, message:error.message})  
    }
})

appBoris.get('/GarderIdAccessoire/:id', tokenValidation,async(req,res)=>{
    try {
        const {id} = req.params
        const getIdAccessoire = await AccessoireSchema.findById(id)
        //console.log(actualisationId)
        return res.json({succes:true, getIdAccessoire})
    } catch (error) {
       return res.json({succes:false, message:error.message})  
    }
})

appBoris.get('/informationAccesoireVoiture/:id',async(req,res)=>{
    try {
        //id de la voiture que je viens de creer
        const {id} = req.params
        const getIdAccessoire = await CreerVoiture.findById(id).populate("AccessoireSchema")
        //console.log(getIdAccessoire)
        return res.json({succes:true, getIdAccessoire})
    } catch (error) {
       return res.json({succes:false, message:error.message})  
    }
})

appBoris.get('/fourgonette', async(req,res)=>{
    try {
       const qualitéVoiture = "fourgonette"
       const typeQualité = await CreerVoiture.find({qualitéVoiture})
       return res.json({succes:true, typeQualité, message:"effectuer avec succes"})
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
})

appBoris.put('/ModifierAccessoire/:id', tokenValidation, async(req,res)=>{
    try {
         // id de l accessoire
        const {id} = req.params
        const {bluetooth,aireConditionné,aireDeStationnement,ABS,radio,kitMainLibre,visiteTechnique,jantes,tempomat,toitOuvrant,systemeNavigation,siegeChauffant,siegeMassant,phares} = req.body
        const modifierVoitureAccessoire = await AccessoireSchema.findByIdAndUpdate(id,{bluetooth,aireConditionné,aireDeStationnement,ABS,radio,kitMainLibre,visiteTechnique,jantes,tempomat,toitOuvrant,systemeNavigation,siegeChauffant,siegeMassant,phares}, {new:true})
            
        return res.json({succes: true, modifierVoitureAccessoire, message:"Votre modification a été éffectuée avec succès"})
    } catch (error) {
       return res.json({succes:false, message:error.message})  
    }
})

appBoris.get('/actualiserAccessoire/:id', tokenValidation, async(req,res)=>{
    try {
         // id de l accessoire
        const {id} = req.params
        const Actualisation = await AccessoireSchema.findById(id)
        return res.json({succes: true, Actualisation, message:"Actualisation effectuée avec succès"})
    } catch (error) {
       return res.json({succes:false, message:error.message})  
    }
})

appBoris.put('/addnewImage/:id', tokenValidation, async(req,res)=>{
    //console.log("test")
   
   try {
    const {id}= req.params
    const {image1,image2,image3,image4,image5} = req.body
    if(!id){
        return res.json({succes:true, message:"Vous devez d'abord creer une nouvelle voiture"})
    }

            const verifId = await CreerVoiture.findById(id)
            if(!verifId){
                res.json({succes: false, message:"cette voiture n existe plus"})
            }

    if(!image1 || !image2 || !image3 || !image4 || !image5){
        res.json({succes: false, message:"remplissez vos elements"})
    }
    //idImage1 === null || idImage1 != undefined || idImage1 == ""
    if(image1 == "" || image1 == null || !image1 ){
        res.json({succes: false, message:"envoyer une erreur"})
    }
  /*let change = await CreerVoiture.findByIdAndUpdate(
    id,
    {$push: {"messages": {image1}}},
    {upsert: true, new : true}
    )*/

  //let docDelete = await BookSchema.findOneAndUpdate(id,{title,description,author},{new:true})
  const createImage = new AutreImage({image1,image2,image3,image4,image5})
  const autreImage = await createImage.save()
  const change = await CreerVoiture.findByIdAndUpdate(id, {autreImage},{new:true})
  //console.log(change)
  
    //const recupereimage = await AutreImage.findById(change.autreImage[0])
    //console.log(recupereimage)
 

    return res.json({succes:true, change, message:"effectué avec succès"})
   } catch (error) {
    return res.json({succes:false, message:error.message})   
   }
})

appBoris.get('/recupereImagePourCarousel/:id', async (req,res)=>{
    try {
        const {id}= req.params
        const recupereimage = await CreerVoiture.findById(id).populate('autreImage')
        console.log(recupereimage)
        const valuefinal = recupereimage.autreImage
        return res.json({succes:true, recupereimage})
    } catch (error) {
        return res.json({succes:false, message:error.message})   
    }
})

appBoris.post('/sendMail', async(req,res)=>{
    try {
        const {email,messages} = req.body

        //seoaration
        //let testAccount = await nodemailer.createTestAccount();

        const sendMail = new MailModelSchema({email,messages})
        console.log(sendMail.email)
        let monMail = sendMail.email
        let monTel = sendMail.telephone
        let monText = sendMail.messages.leMessage

  // create reusable transporter object using the default SMTP transport

    const output = `<span>Message: ${req.body.messages.leMessage}</span> 
                    <span> Numero de telephone: ${req.body.messages.telephone}</span><br/>
                    <span> Nom du pays: ${req.body.messages.pays}</span>`
 
 
  let transporter = nodemailer.createTransport({
    //host: "mail.gmail.com",
    //port: 587,
    //secure: false, // true for 465, false for other ports
   service:'gmail',
    auth: {
      user: USERACOUNTMAIL, // generated ethereal user
      pass: PASSWORDDEUTCH, // generated ethereal password
    },
  });

  var message = {
    from: monMail, // sender address
    to: USERACOUNTMAIL, // list of receivers
    subject: monMail, // Subject line
    text: "monText", // plain text body
    html:output
   // azpkiymdzkqfvozt
  }

  transporter.sendMail(message,(err,info)=>{
    if(err){
        //console.log("error in sending mail")
        return res.json({succes:false, message:"ce mail n est pas envoyé"})
    }else{
        console.log("succes", info)
        return res.json({succes:true,sendMail, message:"envoyé de succes"})
    }
  })

    } catch (error) {
        res.json({succes: false, message: error.message})
        return res.json({succes:true, message:"mail envoyé"})
    }
})

module.exports = appBoris