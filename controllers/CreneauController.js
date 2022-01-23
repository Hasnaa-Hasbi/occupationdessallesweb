const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const { system } = require('nodemon/lib/config');
const Salle = mongoose.model('Salle');
const Creneau = mongoose.model('Creneau');
const Occupation = mongoose.model('Occupation');
const QRCode = require('qrcode');

router.get('/add', (req, res) => {
    Creneau.find((err, docs) => {
        if (!err) {
            Salle.find((error, sallesDocs) => {
                if (!error) {
                    res.render("occupation/addOccupation", {
                        salles: sallesDocs,
                        creneaux: docs,
                        viewTitle: "Add Occupation"
                    });
                }
            }) 
        }
        else {
            console.log('Error in retrieving creneaux list :' + err);
        }
    });
});

router.get('/list/:id', (req, res) => {

    var salle = new Salle;
    Salle.findById(req.params.id, (err, doc) => {
        if (!err) {
            salle.code = doc.code;
            salle.libelle = doc.libelle;
            Occupation.find({ idSalle: req.params.id }, (err, docs) => {
                if (!err) {   
                    res.render("occupation/listOccupation", {
                        salle:salle,
                        list: docs
                    });
        
                }
                else {
                    console.log('Error in retrieving occupation list :' + err);
                }
            });
        }
    });

    


});


router.post('/', (req, res) => {
    var occupation = new Occupation();
    occupation.date = (new Date()).toDateString();
    Salle.findById(req.body.salle,function(err,docs){
        if (err){
            console.log(err);
        }
        else{
            occupation.idSalle=docs;
            occupation.nameSalle=docs.code;
            Creneau.findById(req.body.creneau, function(err,creneauDocs){
                if (err){
                    console.log(err);
                }
                else{
                  occupation.idCreneau=creneauDocs; 
                  occupation.valueCreneau=creneauDocs.debut+"-"+creneauDocs.fin;
                  
                  occupation.save((err, doc) => {
                    if (!err)
                        res.redirect('/salle/list/');
                    else {
                        if (err.name == 'ValidationError') {
                            handleValidationError(err, req.body);
                            res.render("occupation/addOccupation", {
                                viewTitle: "Add Occupation",
                                occupation: req.body
                            });
                        }
                        else
                            console.log('Error during record insertion : ' + err);
                    }
                });
                  
                }
            })
        }
    });
    
});


router.get('/qrgenerator/:id', (req, res) => {
    var salle = new Salle;
    Salle.findById(req.params.id, (err, doc) => {
        if (!err) {
            salle.code = doc.code;
            salle.libelle = doc.libelle;
            QRCode.toDataURL(doc._id+"", (err, srcpic) => {
                if (!err) {
                    console.log(doc._id);
                    res.render("occupation/qrCode", {
                        srcpic: srcpic,
                        salle: salle.libelle
                    });
                }
              })
        }
    });
    
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'code':
                body['codeError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}



module.exports = router;