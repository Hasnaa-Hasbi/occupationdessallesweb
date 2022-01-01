const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Salle = mongoose.model('Salle');
const Bloc = mongoose.model('Bloc');

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var salle = new Salle();
    salle.code = req.body.code;
    salle.libelle = req.body.libelle;
    Bloc.findById(req.body.bloc,function(err,docs){
        if (err){
            console.log(err);
        }
        else{
            salle.nameBloc=docs.code
            console.log(docs.name);
            salle.bloc=docs;
            salle.save((err, doc) => {
                if (!err)
                    res.redirect('salle/list');
                else {
                    if (err.name == 'ValidationError') {
                        handleValidationError(err, req.body);
                        res.render("salle/edit", {
                            viewTitle: "Add Salle",
                            salle: req.body
                        });
                    }
                    else
                        console.log('Error during record insertion : ' + err);
                }
            });
            console.log("Result : ", docs);
        }
    });
    console.log("Bloc.findById(req.body.hall)");

    salle.bloc=Bloc.findById(req.body.hall);
    
    
}

function updateRecord(req, res) {
    Salle.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('salle/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("salle/edit", {
                    viewTitle: 'Update Salle',
                    salle: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Salle.find((err, docs) => {
        if (!err) {
            Bloc.find((err, doc) => {
                if (!err) {
                    res.render("salle/list", {
                        blocs: doc,
                        list: docs,
                        viewTitle: "Classrooms"
                    });
                }
                else {
                    console.log('Error in retrieving blocs list :' + err);
                }
            });
        }
        else {
            console.log('Error in retrieving salle list :' + err);
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
    Salle.findById(req.params.id, (err, doc) => {
        if (!err) {
            Bloc.find((err, docs) => {
                if (!err) {
                    res.render("salle/edit", {
                        viewTitle: "Update Salle",
                        salle: doc,
                        blocs: docs
                    });
                }
                else {
                    console.log('Error in retrieving blocs list :' + err);
                }
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Salle.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/salle/list');
        }
        else { console.log('Error in salle delete :' + err); }
    });
});


module.exports = router;