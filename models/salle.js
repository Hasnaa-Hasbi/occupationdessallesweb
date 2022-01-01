const mongoose=require('mongoose');
const {Schema}=require('mongoose');
var salleSchema=new mongoose.Schema({
    code:{
        type: String,
        required: 'This field is required.'
    },
    libelle:{
        type: String
    },
    bloc: { type: Schema.Types.ObjectId, ref: 'Bloc' },
    nameBloc: { 
        type:String
    }

    


});
mongoose.model('Salle',salleSchema);