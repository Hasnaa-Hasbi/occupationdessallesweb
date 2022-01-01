const mongoose=require('mongoose');
var creneauxSchema=new mongoose.Schema({
    debut:{
        type: String,
        required: 'This field is required.'
    },
    fin:{
        type: String,
        required: 'This field is required.'
    }

});
mongoose.model('Creneau',creneauxSchema);