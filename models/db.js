const mongoose =require('mongoose');
mongoose.connect('mongodb://root:root@cluster0-shard-00-00.zbn75.mongodb.net:27017,cluster0-shard-00-01.zbn75.mongodb.net:27017,cluster0-shard-00-02.zbn75.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-10xvj8-shard-0&authSource=admin&retryWrites=true&w=majority',{useNewUrlParser : true},(err) => {
if (!err){console.log('Mongo Db Connection Succed')}
else{console.log('error in db connection:'+err)}
});
require('./bloc');
require('./salle');
require('./creneaux');
require('./occupation');
require('./user');