const mongoose = require('mongoose');
let express=require('express');
path=require('path');
cors=require('cors');
bodyParser=require('body-parser');
mongoDb=require('./Database/db');
const createError = require('http-errors');

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://0.0.0.0:27017/cryptoCurrency-Project',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('database connected sucessfully');
},error=>{
    console.log('error Database:'+error);
});

const cryptoCurrencyRoute=require('./backend/routes/project.route');
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(cors());

app.use(express.static(path.join(__dirname,'dist/cryptoCurrency')));
console.log(path.join(__dirname,'dist/cryptoCurrency'))
// Api root
app.use('/api',cryptoCurrencyRoute);

const port=process.env.port ||8000;
app.listen(port,()=>{
    console.log('Listening port on:'+port);
})
//404 error handler
app.use((req,res,next)=>{
    next(createError(404));
})
//base route
app.get('/',(req,res)=>{
    res.send('envalid endpoint');

})

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/cryptoCurrency/index.html'));
    
})

app.use(function(err,req,res,next){
    console.log(err.message)
    if(!err.statusCode)err.statusCode=500;
    res.status(err.statusCode).send(err.message);
})
