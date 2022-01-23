const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Bloc = mongoose.model('Bloc');
const salle = mongoose.model('Salle');
const creneaux = mongoose.model('Creneau');
const occupation = mongoose.model('Occupation');
const User = mongoose.model('User');
const {Schema}=require('mongoose');


/** 
 * @swagger 
 * /api/salles: 
 *   get: 
 *     description: Get all salles
 *     responses:  
 *       200: 
 *         description: Success 
 *     tags:
 *       - Salles 
 *   
 */ 
router.get('/salles',function(req,res,next){
        salle.find({}).then(function(salles){
        res.send(salles);
    }).catch(next);
});


/** 
 * @swagger 
 * /api/salles/{_Id}: 
 *   get: 
 *     description: Get salle by Id
 *     parameters:
 *      - in: path
 *        name: _Id   # Note the name is the same as in the path
 *        type: string
 *        required: true
 *     responses:  
 *        200: 
 *         description: Success  
 *     tags:
 *       - Salles 
 *        
 *   
 */
router.get('/salles/:id',function(req,res,next){
    salle.findOne({_id: req.params.id}).then(function(salle){
        res.send(salle);
    });
});




/** 
 * @swagger 
 * /api/blocs: 
 *   get: 
 *     description: Get all blocs
 *     responses:  
 *       200: 
 *         description: Success  
 *     tags:
 *       - Blocs 
 *   
 */ 
router.get('/blocs',function(req,res,next){
    Bloc.find({}).then(function(blocs){
    res.send(blocs);
}).catch(next);
});



/** 
 * @swagger 
 * /api/blocs/{_Id}: 
 *   get: 
 *     description: Get bloc by Id
 *     parameters:
 *      - in: path
 *        name: _Id   
 *        type: string
 *        required: true
 *     responses:  
 *        200: 
 *         description: Success 
 *     tags:
 *       - Blocs  
 *   
 */
router.get('/blocs/:id',function(req,res,next){
    Bloc.findOne({_id: req.params.id}).then(function(bloc){
        res.send(bloc);
    });
});


/** 
 * @swagger 
 * /api/salles/: 
 *   post: 
 *     description: Add salle
 *     parameters:
 *      - name: code
 *        in: formData  
 *        type: string
 *        required: true
 *      - name: libelle
 *        in: formData 
 *        type: string
 *      - name: bloc
 *        in: formData
 *        type: string
 *      - name: nameBloc
 *        in: formData 
 *        type: string
 *     responses:  
 *        200: 
 *         description: Success  
 *     tags:
 *       - Salles 
 *   
 */
router.post('/salles',function(req,res,next){
    salle.create(req.body).then(function(salle){
        res.send(salle);
    }).catch(next);
});



/** 
 * @swagger 
 * /api/blocs/: 
 *   post: 
 *     description: Add bloc
 *     parameters:
 *      - name: code
 *        in: formData  
 *        type: string
 *        required: true
 *      - name: libelle
 *        in: formData  
 *        type: string
 *     responses:  
 *        200: 
 *         description: Success 
 *     tags:
 *       - Blocs  
 *   
 */
router.post('/blocs',function(req,res,next){
    Bloc.create(req.body).then(function(bloc){
        res.send(bloc);
    }).catch(next);
});



/** 
 * @swagger 
 * /api/salles/{_Id}: 
 *   put: 
 *     description: Update salle
 *     parameters:
 *      - in: path
 *        name: _Id   
 *        type: string
 *        required: true
 *      - name: code
 *        in: formData  
 *        type: string
 *        required: true
 *      - name: libelle
 *        in: formData 
 *        type: string
 *      - name: bloc
 *        in: formData
 *        type: string
 *      - name: nameBloc
 *        in: formData 
 *        type: string
 *     responses:  
 *        200: 
 *         description: Success 
 *     tags:
 *       - Salles  
 *   
 */
router.put('/salles/:id',function(req,res,next){
    salle.findOneAndUpdate({_id: req.params.id},req.body).then(function(s){
        salle.findOne({_id: req.params.id}).then(function(s){
            res.send(s);
        });
    });
});



/** 
 * @swagger 
 * /api/blocs/{_Id}: 
 *   put: 
 *     description: Update bloc
 *     parameters:
 *      - in: path
 *        name: _Id   
 *        type: string
 *        required: true
 *      - name: code
 *        in: formData  
 *        type: string
 *        required: true
 *      - name: libelle
 *        in: formData 
 *        type: string
 *     responses:  
 *        200: 
 *         description: Success  
 *     tags:
 *       - Blocs 
 *   
 */
router.put('/blocs/:id',function(req,res,next){
    Bloc.findOneAndUpdate({_id: req.params.id},req.body).then(function(bloc){
        Bloc.findOne({_id: req.params.id}).then(function(bloc){
            res.send(bloc);
        });
    });
});



/** 
 * @swagger 
 * /api/salles/{_Id}: 
 *   delete: 
 *     description: Delete salle
 *     parameters:
 *      - in: path
 *        name: _Id  
 *        type: string
 *        required: true
 *     responses:  
 *        200: 
 *         description: Success  
 *     tags:
 *       - Salles 
 *        
 *   
 */
router.delete('/salles/:id',function(req,res,next){
    salle.findOneAndDelete({_id: req.params.id}).then(function(salle){
        res.send(salle);
    });
});


/** 
 * @swagger 
 * /api/blocs/{_Id}: 
 *   delete: 
 *     description: Delete bloc
 *     parameters:
 *      - in: path
 *        name: _Id   
 *        type: string
 *        required: true
 *     responses:  
 *        200: 
 *         description: Success  
 *     tags:
 *       - Blocs 
 *        
 *   
 */
router.delete('/blocs/:id',function(req,res,next){
    Bloc.findOneAndDelete({_id: req.params.id}).then(function(bloc){
        res.send(bloc);
    });
});


module.exports = router;

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------

/** 
 * @swagger 
 * /api/creneaux: 
 *   get: 
 *     description: Get all creneaux
 *     responses:  
 *       200: 
 *         description: Success  
 *     tags:
 *       - Creneaux 
 *   
 */ 
router.get('/creneaux',function(req,res,next){
    creneaux.find({}).then(function(creneaux){
    res.send(creneaux);
}).catch(next);
});



/** 
 * @swagger 
 * /api/creneaux/{_Id}: 
 *   get: 
 *     description: Get creneau by Id
 *     parameters:
 *      - in: path
 *        name: _Id   
 *        type: string
 *        required: true
 *     responses:  
 *        200: 
 *         description: Success  
 *     tags:
 *       - Creneaux 
 *        
 *   
 */
router.get('/creneaux/:id',function(req,res,next){
        creneaux.findOne({_id: req.params.id}).then(function(creneau){
            res.send(creneau);
        });
});


/** 
 * @swagger 
 * /api/occupations: 
 *   get: 
 *     description: Get all occupations
 *     responses:  
 *       200: 
 *         description: Success 
 *     tags:
 *       - Occupations  
 *   
 */ 
router.get('/occupations',function(req,res,next){
    occupation.find({}).then(function(occupation){
    res.send(occupation);
}).catch(next);
});



/** 
 * @swagger 
 * /api/occupations/{_Id}: 
 *   get: 
 *     description: Get occupation by Id
 *     parameters:
 *      - in: path
 *        name: _Id   
 *        type: string
 *        required: true
 *     responses:  
 *        200: 
 *         description: Success  
 *     tags:
 *       - Occupations 
 *        
 *   
 */
router.get('/occupations/:id',function(req,res,next){
        occupation.findOne({_id: req.params.id}).then(function(occupation){
            res.send(occupation);
        });
});



/** 
 * @swagger 
 * /api/occupations/: 
 *   post: 
 *     description: Add Occupation
 *     parameters:
 *      - name: idSalle
 *        in: formData  
 *        type: string
 *        required: true
 *      - name: idCreneau
 *        in: formData  
 *        type: string
 *     responses:  
 *        200: 
 *         description: Success 
 *     tags:
 *       - Occupations  
 *   
 */
 router.post('/occupations',function(req,res,next){
    var occup = new occupation();
    occup.date = (new Date()).toDateString();
    salle.findById(req.body.idSalle).then(function(docs){
        occup.idSalle=docs;
        occup.nameSalle=docs.code;
        creneaux.findById(req.body.idCreneau ).then(function(creneauDocs){
            occup.idCreneau=creneauDocs; 
            occup.valueCreneau=creneauDocs.debut+"-"+creneauDocs.fin;
            occupation.create(occup).then(function(occup){
                res.send(occup);
            }).catch(next);
        }).catch(next);
    }).catch(next);
});

/** 
 * @swagger 
 * /api/occupations/{_Id}: 
 *   delete: 
 *     description: Delete Occupation
 *     parameters:
 *      - in: path
 *        name: _Id   
 *        type: string
 *        required: true
 *     responses:  
 *        200: 
 *         description: Success  
 *     tags:
 *       - Occupations 
 *        
 *   
 */
 router.delete('/occupations/:id',function(req,res,next){
    occupation.findOneAndDelete({_id: req.params.id}).then(function(occup){
        res.send(occup);
    });
});



/** 
 * @swagger 
 * /api/users: 
 *   get: 
 *     description: Get all users
 *     responses:  
 *       200: 
 *         description: Success  
 *     tags:
 *       - Users 
 *   
 */ 
 router.get('/users',function(req,res,next){
    User.find({}).then(function(users){
    res.send(users);
}).catch(next);
});