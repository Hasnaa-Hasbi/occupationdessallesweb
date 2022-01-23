const mongoose=require('mongoose');
const {Schema}=require('mongoose');

var occupationSchema=new mongoose.Schema({
    idSalle:{
       type: Schema.Types.ObjectId, ref: 'Salle'       
    },
    idCreneau:{
        type: Schema.Types.ObjectId, ref: 'Creneau'
    },
    date:{
        type: String
    },
    valueCreneau: { 
        type:String
    },
    nameSalle: { 
        type:String
    }

});
mongoose.model('Occupation',occupationSchema);