const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Bloc = mongoose.model('Bloc');
const Salle = mongoose.model('Salle');
const Creneau = mongoose.model('Creneau');
const Occupation = mongoose.model('Occupation');


function getSize(array) {
    var nb = 0;
    for (const key in array) {
        nb++;
    }
    return nb;
 } 

router.get('/', (req, res) => {
    var nbBlocs = 0;
    var nbClassrooms = 0;
    var blocs;
    var salles;
    var SallesBloc = [];
    var occupations = [];

    Bloc.find((err, docsBlocs) => {
        if (!err) {
            nbBlocs = getSize(docsBlocs);
            blocs = docsBlocs;            

            Salle.find((err, docsSalles) => {
                if (!err) {
                    nbClassrooms = getSize(docsSalles);
                    salles = docsSalles;
                    for (var bloc in blocs) {
                        var nbr=0;
                        for (var salle in salles) {
                            if(blocs[bloc].code === salles[salle].nameBloc){
                                nbr++;
                            }  
                        }
                        SallesBloc.push(nbr);
                    }

                    Occupation.find((err, occupationDos) => {
                        if (!err) {
                            var occupationsSalle = [];
                            for (var salle in salles) {
                                var nbr=0;
                                for (var occupation in occupationDos) {
                                    if(occupationDos[occupation].nameSalle === salles[salle].code){
                                        nbr++;
                                    }
                                }
                                occupationsSalle.push(nbr);
                            }

                            Salle.find((err, docss) => {
                                if (!err) {
                                    var sallesNames = [];
                                    for (var salle in docss) {
                                        sallesNames.push(docss[salle].code) 
                                    }
        
                                    res.render("home", {
                                        nbBlocs: nbBlocs,
                                        nbClassrooms: nbClassrooms,
                                        blocs: blocs,
                                        salles: salles,
                                        sallesNames: sallesNames,
                                        occupationsSalle: occupationsSalle,
                                        SallesBloc: SallesBloc,
                                        viewTitle: "Dashboard"
                                    });
                                }
                                else {
                                    console.log('Error in retrieving bloc list :' + err);
                                }
                            });
                           
                        }
                        else {
                            console.log('Error in retrieving bloc list :' + err);
                        }
                    });
                    

                }
                else {
                    console.log('Error in retrieving bloc list :' + err);
                }
            });
        }
        else {
            console.log('Error in retrieving bloc list :' + err);
        }
    });

    
    
    

});

/* router.get('/', (req, res) => {
    Bloc.find((err, docs) => {
        if (!err) {
            res.render("bloc/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving bloc list :' + err);
        }
    });
}); */

router.get('/addOrEdit', (req, res) => {
    res.render("bloc/addOrEdit", {
        viewTitle: "Add Bloc"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var bloc = new Bloc();
    
    bloc.code = req.body.code;
    bloc.libelle = req.body.libelle;
    
    bloc.save((err, doc) => {
        if (!err)
            res.redirect('bloc/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("bloc/addOrEdit", {
                    viewTitle: "Add Bloc",
                    bloc: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Bloc.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('bloc/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("bloc/addOrEdit", {
                    viewTitle: 'Update Bloc',
                    bloc: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Bloc.find((err, docs) => {
        if (!err) {
            res.render("bloc/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving bloc list :' + err);
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

router.get('/:id', (req, res) => {
    Bloc.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("bloc/addOrEdit", {
                viewTitle: "Update Bloc",
                bloc: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Bloc.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/bloc/list');
        }
        else { console.log('Error in bloc delete :' + err); }
    });
});


module.exports = router;