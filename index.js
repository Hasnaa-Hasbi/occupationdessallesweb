require('./models/db');
const express=require('express');
const path = require('path');
const exphbs=require('express-handlebars');
const Handlebars = require('handlebars');
const bodyparser = require('body-parser');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const blocController=require('./controllers/blocController');
const salleController=require('./controllers/salleController');
const CreneauController=require('./controllers/CreneauController');

var app=express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname,'/views/'));
app.use(express.static('views'));


app.engine('hbs',exphbs.engine({
    extname:'hbs',
    defaultLayout:'mainLayout', 
    layoutsDir: __dirname + '/views/layouts/',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.set('view engine','hbs');

app.listen(process.env.PORT || 3000,() =>{
    console.log('Express server started at port :3000');
});

app.use(express.json());

app.use('/bloc',blocController);
app.use('/',blocController);
app.use('/salle',salleController);
app.use('/occupation',CreneauController);
app.use('/api',require('./routes/api'));


const swaggerJSDoc = require('swagger-jsdoc');  
const swaggerUI = require('swagger-ui-express');  
//Swagger Configuration  
const swaggerOptions = {  
    swaggerDefinition: {  
        info: {  
            title:'SallesBlocs API',  
            version:'1.0.0'  
        }  
    },  
    apis:['./routes/api.js'],  
}  
const swaggerDocs = swaggerJSDoc(swaggerOptions);  
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));  





